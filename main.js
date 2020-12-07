document.querySelector('#searchBtn').addEventListener('click', () => {


    const xhr = new XMLHttpRequest()
    let name = document.querySelector('#movieName').value
    xhr.open('GET', `http://www.omdbapi.com/?s=${name}&apikey=fe04dfcd&plot=full`);
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText)
            let filmList = data.Search;
            document.querySelector('#films').innerHTML = '';
            for (let i = 0; i < filmList.length; i++) {
                let filmName = data.Search[i].Title;
                let filmYear = data.Search[i].Year;
                let filmType = data.Search[i].Type;
                let filmImg = data.Search[i].Poster;
                let imdbID = data.Search[i].imdbID;
                document.querySelector('#films').innerHTML += `
                <div class="filmCard">
                <div class="filmImg"  style="background-image: url(${filmImg});cursor: pointer;" id="${imdbID}" ></div>
                <div class="filmInfo">
                    <p id="filmName" class="filmName">${filmName}</p>
                    <p id="filmShortDescription" class="filmShortDescription">${filmType}</p>
                    <p id="filmShortDescription" class="filmShortDescription">${filmYear}</p>
                </div>
            </div>`
            }
        }
        let filmCards = document.getElementsByClassName('filmImg');

        for (let i = 0; i < filmCards.length; i++) {

            filmCards[i].addEventListener('click', (click) => {
                const description = new XMLHttpRequest();
                description.open('get', `http://www.omdbapi.com/?apikey=fe04dfcd&i=${click.target.id}&plot=full`)

                description.onreadystatechange = function () {
                    if (description.readyState === 4 && xhr.status === 200) {
                        let desc = JSON.parse(description.responseText)
                        let poster = desc.Poster
                        let title = desc.Title
                        let aboutMovie = desc.Plot
                        document.querySelector('#nameOfMovie').textContent = title
                        document.querySelector('#aboutMovie').textContent = aboutMovie
                        document.querySelector('#poster').style.backgroundImage = `url(${poster})`
                        document.querySelector('#btnContainer').style.display = 'block';
                        document.querySelector('#descriptionWindow').style.display = 'flex';
                    }





                }
                description.send();
            })

        }

    }
    xhr.send();






})
document.querySelector('#btnClose').addEventListener('click', function () {
    document.querySelector('#nameOfMovie').textContent = ''
    document.querySelector('#aboutMovie').textContent = ''
    document.querySelector('#poster').style.backgroundImage = ''
    document.querySelector('#descriptionWindow').style.display = 'none';
    document.querySelector('#btnContainer').style.display = 'none';
})