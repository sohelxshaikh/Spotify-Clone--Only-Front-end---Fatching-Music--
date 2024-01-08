async function getSongs() {
    try {
        let response = await fetch("http://127.0.0.1:5500/songs/");
        let text = await response.text();
        console.log(text);

        let div = document.createElement("div");
        div.innerHTML = text;

        let links = div.getElementsByTagName("a");
        let songs = [];

        for (let index = 0; index < links.length; index++) {
            const elem = links[index];
            if (elem.href.endsWith(".mp3")) {
                songs.push(elem.href);
            }
        }

        console.log(songs); // Log the list of songs here
        return songs; // Return the list of songs

    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

async function main() {
    try {
        let songs = await getSongs();
        console.log(songs);

        const playPauseButton = document.getElementById("play-pause");
        const skipPreviousButton = document.getElementById("skip-previous");
        const skipNextButton = document.getElementById("skip-next");

        let audio;
        let currentSongIndex = 0;

        playPauseButton.addEventListener("click", () => {
            if (!audio) {
                if (songs.length > 0) {
                    audio = new Audio(songs[currentSongIndex]);
                    audio.play();
                    playPauseButton.textContent = "Pause";
                } else {
                    console.log("No songs available.");
                }
            } else {
                if (audio.paused) {
                    audio.play();
                    playPauseButton.textContent = "Pause";
                } else {
                    audio.pause();
                    playPauseButton.textContent = "play_arrow";
                }
            }
        });

        skipPreviousButton.addEventListener("click", () => {
            if (currentSongIndex > 0) {
                currentSongIndex--;
                audio.src = songs[currentSongIndex];
                audio.play();
                playPauseButton.textContent = "Pause";
            }
        });

        skipNextButton.addEventListener("click", () => {
            if (currentSongIndex < songs.length - 1) {
                currentSongIndex++;
                audio.src = songs[currentSongIndex];
                audio.play();
                playPauseButton.textContent = "Pause";
            }
        });

    } catch (error) {
        console.error("Error in main:", error);
    }
}

main();
