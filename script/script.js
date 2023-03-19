
window.addEventListener("DOMContentLoaded", event => {
    async function callback() {

        if (document.querySelector('input').value != '') {
            let message = document.createElement('p');
            message.textContent = 'Поиск. Пожалуйста, подождите...';
            document.body.append(message);

            let request = document.querySelector('input').value;

            const queryString = encodeURIComponent(`${request} in:name`);

            const response = await fetch(`https://api.github.com/search/repositories?q=${queryString}`);
            const myJson = await response.json(); //extract JSON from the http response

            let count = document.createElement('p');
            if (myJson.total_count != 0) {
                count.innerHTML = 'Найдено репозиториев: ' + myJson.total_count;
                document.body.append(count);
            } else {
                count.innerHTML = 'Ничего не найдено';
                document.body.append(count);
            }
        

            for (let i = 0; i < 10; i++) {
                let subscribers = document.createElement('p');
                subscribers.innerHTML = 'Подписчики пользователя: ' + myJson.items[i].watchers;
                subscribers.style.margin = '1%';
                let human = document.createElement('a');
                human.innerHTML = myJson.items[i].name;
                human.href = `${myJson.items[i].html_url}`;
                human.style.textDecoration = 'none';
                human.style.color = 'blue';
                human.style.margin = '1%'
                human.target = "_blank";
                human.style.display = 'block';
                document.body.append(human);
                document.body.append(subscribers);
            }
        } else {
            document.querySelector('input').style.borderColor = 'red';
            document.querySelector('input').placeholder = 'Подстрока пуста';
            document.querySelector('input').style.transition = '0.2s';
            document.getElementById('find').disabled = true;
        }
    };   

    document.getElementById('find').addEventListener('click', callback);
    document.querySelector('input').addEventListener('click', function () {
        document.querySelector('input').style.borderColor = '';
        document.querySelector('input').placeholder = 'Введите подстроку';
        document.getElementById('find').disabled = false;
    });
  })
