// music
const input = document.getElementById('input');
const btn = document.getElementById('search');
const result = document.getElementById('result');

let handledata = (data)=>{
    // console.log(data);
    if (document.body.contains(document.getElementById('song'))) {
        document.getElementById('song').remove();
    }
    


    data.forEach(song => {
        // console.log(song)
        const album = song.album;
        const thumbnail = song.image;        
        const audio = song.media_url;
        const artists = song.singers;
        const duration ={
            minutes : Math.floor(parseInt(song.duration)/60) ,
            seconds : parseInt(song.duration)%60
        }
        const music = song.music;
        const totalplays = song.play_count;
        const releaseDate = song.release_date;

        // console.log(audio);
        const div = document.createElement('div')
        div.id = 'song';
        div.innerHTML = `<img src = ${thumbnail} alt = "thumbnail" class = "image">
        <p class = 'audio'> <audio src = ${audio} controls >click</audio> </p>
        <p class = 'duration'> Duration : ${duration.minutes}:${duration.seconds} </p>
        <p class = 'album'> Album : ${album}</p>
        <p class = 'singer'> Singer : ${artists} </p>
        <p class = 'music'> Music By : ${music} </p>
        <p class = 'totalplays'> Total Plays : ${totalplays} </p>
        <p class = 'totalplays'> Release Date : ${releaseDate} </p> `
        
        result.insertAdjacentElement('beforeend',div);
    });
}


async function fetching(api) {
    console.log("Fetching API");
    let result;
    try {
        const response = await fetch(api);
        result = await response.json();
    } catch (error) {
        console.log("Unable to fetch API:", error);
    }
    handledata(result);
}

// document.addEventListener('DOMContentLoaded', () => {
btn.addEventListener('click',()=>{
    const song = input.value.trim();
    // const song = 'ishq'
    fetching(`https://saavnapi-nine.vercel.app/result/?query=${song}&lyrics=true`);
})

input.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter')
        btn.click();
})
document.addEventListener('play', function(e){
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        if (audio !== e.target) {
            audio.pause();
        }
    });
}, true);
