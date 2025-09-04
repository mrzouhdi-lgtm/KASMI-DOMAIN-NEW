document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsForm');
    const resultsTableBody = document.querySelector('#resultsTable tbody');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (!data.geminiApiKey) {
            alert('Gemini API Key is required!');
            return;
        }

        try {
            const response = await fetch('/generate-domains', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
                return;
            }

            const result = await response.json();
            resultsTableBody.innerHTML = '';

            if (result.domains && result.domains.length > 0) {
                result.domains.forEach(domain => {
                    const row = resultsTableBody.insertRow();
                    row.insertCell().textContent = domain.suggestedDomain;
                    row.insertCell().textContent = domain.reasoning;
                    const availabilityCell = row.insertCell();
                    const checkButton = document.createElement('button');
                    checkButton.textContent = 'Check Availability';
                    checkButton.classList.add('availability-button');
                    checkButton.addEventListener('click', async () => {
                        checkButton.textContent = 'Checking...';
                        checkButton.disabled = true;
                        try {
                            const checkResponse = await fetch('/check-availability', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ domain: domain.suggestedDomain + '.' + data.tld })
                            });

                            if (!checkResponse.ok) {
                                const errorCheckData = await checkResponse.json();
                                checkButton.textContent = `Error: ${errorCheckData.error}`;
                                checkButton.classList.add('taken');
                                return;
                            }

                            const checkResult = await checkResponse.json();
                            if (checkResult.isAvailable) {
                                checkButton.textContent = 'Available!';
                                checkButton.classList.add('available');
                            } else {
                                checkButton.textContent = 'Taken!';
                                checkButton.classList.add('taken');
                            }
                        } catch (error) {
                            console.error('Error checking domain availability:', error);
                            checkButton.textContent = 'Error';
                            checkButton.classList.add('taken');
                        } finally {
                            checkButton.disabled = false;
                        }
                    });
                    availabilityCell.appendChild(checkButton);
                });
            } else {
                const row = resultsTableBody.insertRow();
                const cell = row.insertCell();
                cell.colSpan = 3;
                cell.textContent = 'No domains generated. Please try adjusting your parameters or API keys.';
            }
        } catch (error) {
            console.error('Error fetching domains:', error);
            alert('An unexpected error occurred while fetching domains.');
        }
    });
});