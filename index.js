const quizQuestions = [
            {
                question: "The cat is sleeping ___ the sofa.",
                options: ["in", "on", "at", "over"],
                correct: 1
            },
            {
                question: "She lives ___ Paris, France.",
                options: ["at", "on", "in", "by"],
                correct: 2
            },
            {
                question: "Meet me ___ the entrance of the theater.",
                options: ["in", "on", "at", "between"],
                correct: 2
            },
            {
                question: "The children are playing ___ the garden.",
                options: ["at", "on", "in", "above"],
                correct: 2
            },
            {
                question: "There's a bridge ___ the river.",
                options: ["under", "below", "beneath", "over"],
                correct: 3
            },
            {
                question: "The bakery is ___ the bookstore and the pharmacy.",
                options: ["among", "between", "behind", "beside"],
                correct: 1
            },
            {
                question: "I left my wallet ___ the car.",
                options: ["on", "at", "in", "over"],
                correct: 2
            },
            {
                question: "The painting hangs ___ the fireplace.",
                options: ["over", "under", "at", "in"],
                correct: 0
            },
            {
                question: "She found her ring ___ all her jewelry.",
                options: ["between", "among", "behind", "beside"],
                correct: 1
            },
            {
                question: "The parking lot is ___ the building.",
                options: ["above", "over", "behind", "under"],
                correct: 2
            }
        ];

        let userAnswers = new Array(quizQuestions.length).fill(null);
        let quizSubmitted = false;

        function createQuiz() {
            const container = document.getElementById('quiz-container');
            
            quizQuestions.forEach((q, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question';
                questionDiv.innerHTML = `
                    <h4>Question ${index + 1}: ${q.question}</h4>
                    <div class="options" data-question="${index}">
                        ${q.options.map((option, optIndex) => `
                            <div class="option" data-question="${index}" data-option="${optIndex}">
                                ${option}
                            </div>
                        `).join('')}
                    </div>
                `;
                container.appendChild(questionDiv);
            });

            document.querySelectorAll('.option').forEach(option => {
                option.addEventListener('click', handleOptionClick);
            });
        }

        function handleOptionClick(e) {
            if (quizSubmitted) return;

            const questionIndex = parseInt(e.target.dataset.question);
            const optionIndex = parseInt(e.target.dataset.option);
            
            document.querySelectorAll(`[data-question="${questionIndex}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            
            e.target.classList.add('selected');
            userAnswers[questionIndex] = optionIndex;
        }

        function submitQuiz() {
            if (quizSubmitted) return;

            const unanswered = userAnswers.filter(answer => answer === null).length;
            
            if (unanswered > 0) {
                alert(`Please answer all questions! You have ${unanswered} unanswered question(s).`);
                return;
            }

            quizSubmitted = true;
            let score = 0;

            quizQuestions.forEach((q, index) => {
                const options = document.querySelectorAll(`[data-question="${index}"]`);
                options.forEach((option, optIndex) => {
                    if (optIndex === q.correct) {
                        option.classList.add('correct');
                    }
                    if (optIndex === userAnswers[index] && userAnswers[index] !== q.correct) {
                        option.classList.add('incorrect');
                    }
                });

                if (userAnswers[index] === q.correct) {
                    score++;
                }
            });

            const resultDiv = document.getElementById('result');
            const percentage = (score / quizQuestions.length * 100).toFixed(0);
            resultDiv.textContent = `You scored ${score} out of ${quizQuestions.length} (${percentage}%)`;
            resultDiv.classList.add('show');

            document.getElementById('submit-quiz').disabled = true;
            document.getElementById('submit-quiz').textContent = 'Quiz Completed';
        }

        createQuiz();
        document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
    