document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const randomTipElement = document.getElementById('random-tip');
    const generateTipButton = document.getElementById('generate-tip');
    const menuLinks = document.querySelectorAll('.menu a');
    const backToTopButton = document.getElementById('back-to-top');

    // --- Gerenciamento de Tema (Modo Claro/Escuro) ---
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else {
        body.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Planner de Tarefas Sustentáveis ---
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.classList.toggle('completed', task.completed);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                tasks.forEach((t, i) => {
                    if (i === index) {
                        t.completed = checkbox.checked;
                    }
                });
                saveTasks();
                renderTasks();
            });

            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('delete-task');
            deleteButton.addEventListener('click', () => {
                tasks = tasks.filter((_, i) => i !== index);
                saveTasks();
                renderTasks();
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(taskText);
            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
        });
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            newTaskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    newTaskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskButton.click();
        }
    });

    renderTasks();

    // --- Dicas Eco-Friendly Aleatórias ---
    const ecoTips = [
        "Reutilize potes de creme e embalagens para guardar pequenos objetos.",
        "Prefira refis para seus produtos de higiene e beleza sempre que possível.",
        "Opte por produtos com embalagens recicladas ou recicláveis.",
        "Desligue a água enquanto ensaboa o cabelo ou escova os dentes.",
        "Use sabonetes em barra em vez de líquidos para reduzir o plástico.",
        "Experimente fazer seus próprios cosméticos naturais com ingredientes simples.",
        "Reduza o consumo de produtos com microplásticos (esfoliantes, purpurinas).",
        "Apoie marcas que têm compromisso com a sustentabilidade e a crueldade zero.",
        "Separe corretamente as embalagens vazias para reciclagem.",
        "Doe ou descarte corretamente produtos de beleza que você não usa mais.",
        "Troque discos de algodão descartáveis por opções reutilizáveis (tecido, silicone).",
        "Use escovas de dente de bambu ou outros materiais biodegradáveis.",
        "Evite o desperdício de produtos, usando a quantidade necessária.",
        "Reutilize as toalhas de banho por mais tempo antes de lavá-las.",
        "Considere o impacto ambiental dos ingredientes dos seus produtos.",
        "Dê preferência a cosméticos sólidos (shampoo, condicionador, desodorante)."
    ];

    const generateRandomTip = () => {
        const randomIndex = Math.floor(Math.random() * ecoTips.length);
        randomTipElement.textContent = ecoTips[randomIndex];
    };

    generateTipButton.addEventListener('click', generateRandomTip);
    generateRandomTip();

    // --- Scroll Suave para o Menu ---
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Ajuste o valor para considerar a altura do header fixo, se houver
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Botão Voltar ao Topo ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});