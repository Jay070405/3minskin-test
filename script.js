document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const introSection = document.getElementById('intro-section');
    const quizSection = document.getElementById('quiz-section');
    const resultsSection = document.getElementById('results-section');
    const startTestBtn = document.getElementById('start-test');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const questionContainer = document.getElementById('question-container');
    const progressBar = document.getElementById('progress');
    const resultContainer = document.getElementById('result-container');
    const routineContainer = document.getElementById('routine-container');
    const restartTestBtn = document.getElementById('restart-test');

    // Quiz questions
    const questions = [
        {
            id: 1,
            text: "How does your skin feel after cleansing?",
            options: [
                { text: "Comfortable and normal", score: { normal: 2 } },
                { text: "Tight and dry", score: { dry: 2 } },
                { text: "Still oily, especially in the T-zone", score: { oily: 2 } },
                { text: "Tight in some areas, oily in others", score: { combination: 2 } },
                { text: "Irritated or stinging", score: { sensitive: 2 } }
            ]
        },
        {
            id: 2,
            text: "By mid-day, how does your skin look?",
            options: [
                { text: "Still looks fresh with minimal shine", score: { normal: 2 } },
                { text: "Feels dry or flaky", score: { dry: 2 } },
                { text: "Looks shiny all over", score: { oily: 2 } },
                { text: "Shiny T-zone (forehead, nose, chin) but normal/dry elsewhere", score: { combination: 2 } },
                { text: "May have developed some redness", score: { sensitive: 2 } }
            ]
        },
        {
            id: 3,
            text: "How often do you experience breakouts?",
            options: [
                { text: "Rarely", score: { normal: 2, dry: 1 } },
                { text: "Occasionally during seasonal changes", score: { normal: 1, sensitive: 1 } },
                { text: "Frequently, especially in the T-zone", score: { oily: 2, combination: 1 } },
                { text: "Regularly, all over the face", score: { oily: 2 } },
                { text: "Sometimes, but they're usually due to product reactions", score: { sensitive: 2 } }
            ]
        },
        {
            id: 4,
            text: "How visible are your pores?",
            options: [
                { text: "Barely visible", score: { normal: 1, dry: 2 } },
                { text: "Small and not noticeable", score: { normal: 2 } },
                { text: "Large and visible, especially on the nose and cheeks", score: { oily: 2 } },
                { text: "Visible in the T-zone but not on cheeks", score: { combination: 2 } },
                { text: "Varies depending on skin reactions", score: { sensitive: 1 } }
            ]
        },
        {
            id: 5,
            text: "How does your skin react to new products?",
            options: [
                { text: "Usually adapts well with no issues", score: { normal: 2 } },
                { text: "Sometimes feels drier", score: { dry: 2 } },
                { text: "May cause more oiliness or breakouts", score: { oily: 1 } },
                { text: "Different reactions in different areas", score: { combination: 1 } },
                { text: "Often causes redness, irritation, or breakouts", score: { sensitive: 2 } }
            ]
        },
        {
            id: 6,
            text: "How does your skin feel in different seasons?",
            options: [
                { text: "Stays relatively consistent year-round", score: { normal: 2 } },
                { text: "Gets drier in winter, slightly better in summer", score: { dry: 2 } },
                { text: "Gets oilier in summer, slightly better in winter", score: { oily: 2 } },
                { text: "T-zone gets oilier in summer, cheeks get drier in winter", score: { combination: 2 } },
                { text: "More reactive and sensitive during seasonal changes", score: { sensitive: 2 } }
            ]
        },
        {
            id: 7,
            text: "How often do you experience skin redness?",
            options: [
                { text: "Rarely or never", score: { normal: 2, oily: 1 } },
                { text: "Occasionally when using harsh products", score: { normal: 1, dry: 1 } },
                { text: "Sometimes in the T-zone area", score: { combination: 1 } },
                { text: "Frequently, especially after using products or in extreme weather", score: { sensitive: 2 } },
                { text: "Constantly have some redness", score: { sensitive: 2, dry: 1 } }
            ]
        },
        {
            id: 8,
            text: "What is your skin's texture like?",
            options: [
                { text: "Smooth and even", score: { normal: 2 } },
                { text: "Rough or flaky in some areas", score: { dry: 2 } },
                { text: "Smooth but with occasional blemishes", score: { oily: 1, combination: 1 } },
                { text: "Uneven - some areas smooth, others rough", score: { combination: 2 } },
                { text: "Varies depending on reactions, sometimes bumpy", score: { sensitive: 2 } }
            ]
        }
    ];

    // Skin type descriptions and recommendations
    const skinTypes = {
        normal: {
            title: "Normal Skin",
            description: "You have well-balanced skin that's neither too oily nor too dry. Your pores are small, and your skin has a smooth, even texture with good circulation and a healthy color.",
            routine: [
                {
                    step: "Cleanser",
                    recommendation: "Use a gentle, pH-balanced cleanser morning and night."
                },
                {
                    step: "Toner",
                    recommendation: "Optional: Use an alcohol-free toner to maintain pH balance."
                },
                {
                    step: "Moisturizer",
                    recommendation: "Apply a lightweight, non-comedogenic moisturizer."
                },
                {
                    step: "Sunscreen",
                    recommendation: "Use SPF 30+ daily, even on cloudy days."
                },
                {
                    step: "Exfoliation",
                    recommendation: "Exfoliate 1-2 times per week to maintain skin clarity."
                }
            ]
        },
        dry: {
            title: "Dry Skin",
            description: "Your skin tends to feel tight, especially after cleansing. You may experience flakiness, rough patches, or a dull complexion. Your skin is more prone to showing fine lines and may feel less elastic.",
            routine: [
                {
                    step: "Cleanser",
                    recommendation: "Use a creamy, hydrating cleanser that doesn't strip natural oils."
                },
                {
                    step: "Toner",
                    recommendation: "Use a hydrating, alcohol-free toner with ingredients like hyaluronic acid."
                },
                {
                    step: "Serum",
                    recommendation: "Apply a hydrating serum with hyaluronic acid or glycerin."
                },
                {
                    step: "Moisturizer",
                    recommendation: "Use a rich, emollient moisturizer, possibly with ceramides or fatty acids."
                },
                {
                    step: "Face Oil",
                    recommendation: "Consider adding a few drops of facial oil to your routine for extra hydration."
                },
                {
                    step: "Sunscreen",
                    recommendation: "Use a moisturizing sunscreen with SPF 30+ daily."
                },
                {
                    step: "Exfoliation",
                    recommendation: "Gently exfoliate 1-2 times per week with a mild chemical exfoliant."
                }
            ]
        },
        oily: {
            title: "Oily Skin",
            description: "Your skin produces excess sebum, giving it a shiny appearance, especially in the T-zone. You may have enlarged pores and be prone to blackheads and breakouts. However, oily skin often ages well with fewer wrinkles.",
            routine: [
                {
                    step: "Cleanser",
                    recommendation: "Use a gentle foaming cleanser morning and night."
                },
                {
                    step: "Toner",
                    recommendation: "Use an alcohol-free toner with ingredients like niacinamide or witch hazel."
                },
                {
                    step: "Treatment",
                    recommendation: "Consider products with salicylic acid to help with oil control and prevent breakouts."
                },
                {
                    step: "Moisturizer",
                    recommendation: "Use a lightweight, oil-free gel moisturizer."
                },
                {
                    step: "Sunscreen",
                    recommendation: "Use an oil-free, non-comedogenic sunscreen with SPF 30+ daily."
                },
                {
                    step: "Exfoliation",
                    recommendation: "Exfoliate 2-3 times per week with a BHA (salicylic acid) exfoliant."
                },
                {
                    step: "Mask",
                    recommendation: "Use a clay mask 1-2 times per week to absorb excess oil."
                }
            ]
        },
        combination: {
            title: "Combination Skin",
            description: "You have a mix of skin types - typically an oily T-zone (forehead, nose, and chin) with normal to dry cheeks. Your pore size may vary across your face, and you might experience occasional breakouts in the oilier areas.",
            routine: [
                {
                    step: "Cleanser",
                    recommendation: "Use a balanced cleanser that doesn't strip or over-moisturize."
                },
                {
                    step: "Toner",
                    recommendation: "Consider using different toners for different areas or a balanced formula for all areas."
                },
                {
                    step: "Treatment",
                    recommendation: "Target specific areas with appropriate treatments - oil control for T-zone, hydration for dry areas."
                },
                {
                    step: "Moisturizer",
                    recommendation: "Use a lightweight, balanced moisturizer all over, with extra hydration on dry areas if needed."
                },
                {
                    step: "Sunscreen",
                    recommendation: "Use a balanced sunscreen with SPF 30+ daily."
                },
                {
                    step: "Exfoliation",
                    recommendation: "Exfoliate 1-2 times per week, possibly with different products for different areas."
                },
                {
                    step: "Mask",
                    recommendation: "Consider multi-masking - clay mask on T-zone, hydrating mask on dry areas."
                }
            ]
        },
        sensitive: {
            title: "Sensitive Skin",
            description: "Your skin reacts easily to products or environmental factors with redness, itching, burning, or rash. You may also have visible broken capillaries and be prone to flushing. Your skin barrier may be compromised.",
            routine: [
                {
                    step: "Cleanser",
                    recommendation: "Use a fragrance-free, gentle cleanser formulated for sensitive skin."
                },
                {
                    step: "Toner",
                    recommendation: "Optional: Use a soothing, alcohol-free toner with minimal ingredients."
                },
                {
                    step: "Treatment",
                    recommendation: "Look for products with soothing ingredients like centella asiatica, aloe, or oat extract."
                },
                {
                    step: "Moisturizer",
                    recommendation: "Use a simple, fragrance-free moisturizer designed for sensitive skin."
                },
                {
                    step: "Sunscreen",
                    recommendation: "Use a mineral sunscreen (zinc oxide/titanium dioxide) with SPF 30+ daily."
                },
                {
                    step: "Exfoliation",
                    recommendation: "Limit exfoliation to once a week with a very gentle product, or avoid if skin is reactive."
                },
                {
                    step: "General Advice",
                    recommendation: "Always patch test new products and introduce them one at a time."
                }
            ]
        }
    };

    // Variables to track quiz state
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let skinTypeScores = {
        normal: 0,
        dry: 0,
        oily: 0,
        combination: 0,
        sensitive: 0
    };

    // 添加测试结果存储
    const STORAGE_KEY = 'skinTypeResults';

    function saveResult(skinType) {
        let results = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        // 只保留最近的10个结果
        if (results.length >= 10) {
            results.shift();
        }
        results.push(skinType);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    }

    function calculateStatistics() {
        const results = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const stats = {
            normal: 0,
            dry: 0,
            oily: 0,
            combination: 0,
            sensitive: 0
        };
        
        results.forEach(type => {
            stats[type]++;
        });
        
        return stats;
    }

    // 添加模拟数据
    const mockData = {
        totalTests: 10,
        results: {
            normal: 3,
            dry: 2,
            oily: 2,
            combination: 2,
            sensitive: 1
        }
    };

    // Event listener for view stats button
    document.getElementById('view-stats').addEventListener('click', async () => {
        try {
            // Switch to statistics section first
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById('stats-section').classList.add('active');
            
            // Then display statistics data
            await showStatistics();
        } catch (error) {
            console.error("Error viewing statistics:", error);
        }
    });

    // Event listener for back to intro button
    document.getElementById('back-to-intro').addEventListener('click', () => {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        // Show intro section
        introSection.classList.add('active');
    });

    // Event listener for restart test button
    document.getElementById('restart-test').addEventListener('click', () => {
        // Reset all answers
        userAnswers = [];
        currentQuestionIndex = 0;
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show intro section
        introSection.classList.add('active');
        
        // Reset progress bar
        updateProgressBar();
        
        // Clear result container
        resultContainer.innerHTML = '';
        routineContainer.innerHTML = '';
    });

    // Get statistics data from localStorage
    function getStatistics() {
        try {
            const stats = localStorage.getItem('skinTypeStats');
            if (stats) {
                return JSON.parse(stats);
            } else {
                // If no data exists, return initial data
                const initialData = {
                    normal: 0,
                    dry: 0,
                    oily: 0,
                    combination: 0,
                    sensitive: 0,
                    totalTests: 0,
                    lastUpdated: Date.now()
                };
                // Save initial data to localStorage
                localStorage.setItem('skinTypeStats', JSON.stringify(initialData));
                return initialData;
            }
        } catch (error) {
            console.error("Error getting statistics:", error);
            return {
                error: error.message
            };
        }
    }

    // Update statistics data in localStorage
    function updateStatistics(skinType) {
        try {
            // Get current statistics
            let currentStats = getStatistics();
            if (currentStats.error) {
                throw new Error(currentStats.error);
            }

            // Update the counts
            currentStats[skinType] = (currentStats[skinType] || 0) + 1;
            currentStats.totalTests = (currentStats.totalTests || 0) + 1;
            currentStats.lastUpdated = Date.now();

            // Save updated statistics
            localStorage.setItem('skinTypeStats', JSON.stringify(currentStats));
            return currentStats;
        } catch (error) {
            console.error("Error updating statistics:", error);
            return {
                error: error.message
            };
        }
    }

    // Format date display
    function formatDate(timestamp) {
        if (!timestamp) return 'N/A';
        return new Date(timestamp).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    async function showStatistics() {
        try {
            const stats = getStatistics();
            if (stats.error) {
                throw new Error(stats.error);
            }
            
            // Ensure stats-section is visible
            document.getElementById('stats-section').classList.add('active');
            
            // Calculate total first
            const total = stats.totalTests || 0;
            
            // Update statistics numbers and percentages
            const types = ['normal', 'dry', 'oily', 'combination', 'sensitive'];
            types.forEach((type, index) => {
                const count = stats[type] || 0;
                const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0';
                const li = document.querySelectorAll('.stats-list li')[index];
                const typeName = type.charAt(0).toUpperCase() + type.slice(1);
                li.textContent = `${typeName} Skin: ${count} people (${percentage}%)`;
            });
            
            // Update total count and last update time
            document.querySelector('.total-tests').textContent = 
                `Total Tests: ${total} people | Last Updated: ${formatDate(stats.lastUpdated)}`;
            
            // Get canvas element
            const chartCanvas = document.getElementById('skinTypeChart');
            
            // Destroy old chart if exists
            if (window.myChart) {
                window.myChart.destroy();
            }
            
            // Create new chart
            const ctx = chartCanvas.getContext('2d');
            window.myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Normal Skin', 'Dry Skin', 'Oily Skin', 'Combination Skin', 'Sensitive Skin'],
                    datasets: [{
                        data: types.map(type => stats[type] || 0),
                        backgroundColor: [
                            '#8e9aaf',
                            '#cbc0d3',
                            '#efd3d7',
                            '#feeafa',
                            '#dee2ff'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Skin Type Distribution Statistics'
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error displaying statistics:", error);
        }
    }

    // Initialize the quiz
    function initQuiz() {
        currentQuestionIndex = 0;
        userAnswers = [];
        skinTypeScores = {
            normal: 0,
            dry: 0,
            oily: 0,
            combination: 0,
            sensitive: 0
        };
        showQuestion(currentQuestionIndex);
        updateProgressBar();
    }

    // Show a specific question
    function showQuestion(index) {
        const question = questions[index];
        let optionsHTML = '';
        
        question.options.forEach((option, i) => {
            const isSelected = userAnswers[index] === i;
            optionsHTML += `
                <div class="option ${isSelected ? 'selected' : ''}" data-index="${i}">
                    ${option.text}
                </div>
            `;
        });

        questionContainer.innerHTML = `
            <div class="question">
                <h3>Question ${index + 1} of ${questions.length}</h3>
                <p>${question.text}</p>
                <div class="options">
                    ${optionsHTML}
                </div>
            </div>
        `;

        // Add event listeners to options
        document.querySelectorAll('.option').forEach((option, i) => {
            option.addEventListener('click', () => selectOption(i));
        });

        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === questions.length - 1 ? 'See Results' : 'Next';
    }

    // Handle option selection
    function selectOption(optionIndex) {
        userAnswers[currentQuestionIndex] = optionIndex;
        
        // Update UI to show selected option
        document.querySelectorAll('.option').forEach((option, i) => {
            option.classList.toggle('selected', i === optionIndex);
        });
    }

    // Update progress bar
    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Calculate results
    function calculateResults() {
        // Reset scores
        Object.keys(skinTypeScores).forEach(type => {
            skinTypeScores[type] = 0;
        });

        // Calculate scores based on answers
        userAnswers.forEach((answerIndex, questionIndex) => {
            const selectedOption = questions[questionIndex].options[answerIndex];
            Object.entries(selectedOption.score).forEach(([skinType, score]) => {
                skinTypeScores[skinType] += score;
            });
        });

        // Find the skin type with the highest score
        let maxScore = 0;
        let dominantSkinType = 'normal';

        Object.entries(skinTypeScores).forEach(([skinType, score]) => {
            if (score > maxScore) {
                maxScore = score;
                dominantSkinType = skinType;
            }
        });

        return dominantSkinType;
    }

    // Show results
    async function showResults(skinType) {
        try {
            const result = skinTypes[skinType];
            
            resultContainer.innerHTML = `
                <div class="result-type">${result.title}</div>
                <div class="result-description">${result.description}</div>
            `;

            routineContainer.innerHTML = '';
            result.routine.forEach(item => {
                routineContainer.innerHTML += `
                    <div class="routine-item">
                        <h4>${item.step}</h4>
                        <p>${item.recommendation}</p>
                    </div>
                `;
            });

            // Update statistics in localStorage
            const updateResult = updateStatistics(skinType);
            
            if (updateResult.error) {
                throw new Error(updateResult.error);
            }
            
            // Show results and updated statistics
            introSection.classList.remove('active');
            quizSection.classList.remove('active');
            resultsSection.classList.add('active');
            
            // Update statistics chart
            await showStatistics();
        } catch (error) {
            console.error("Error showing results:", error);
            resultContainer.innerHTML += `
                <div class="error-message">
                    <p>Error saving statistics. Your personal results are shown, but couldn't be updated in the overall statistics.</p>
                    <p>Error message: ${error.message}</p>
                </div>
            `;
            
            // Still show results section
            introSection.classList.remove('active');
            quizSection.classList.remove('active');
            resultsSection.classList.add('active');
        }
    }

    // Event Listeners
    startTestBtn.addEventListener('click', () => {
        introSection.classList.remove('active');
        quizSection.classList.add('active');
        initQuiz();
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
            updateProgressBar();
        }
    });

    nextBtn.addEventListener('click', async () => {
        // Only proceed if an option is selected
        if (userAnswers[currentQuestionIndex] !== undefined) {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
                updateProgressBar();
            } else {
                // Show results if we're on the last question
                const skinType = calculateResults();
                await showResults(skinType);
            }
        } else {
            alert('Please select an option before proceeding.');
        }
    });
}); 