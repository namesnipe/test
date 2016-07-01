var downloadSongData = false;

$(document).keypress(event => {
    if (event.which == KEY_P_UPPER || event.which == KEY_P_LOWER) {
        if (started) {
            if (isPlaying) {
                bufferSource.stop();
                currentTime += Date.now() - started;
                velMult = 0;
            } else {
                var newSource = context.createBufferSource();
                newSource.buffer = bufferSource.buffer;
                bufferSource = newSource;
                setOnEnded();
                bufferSource.connect(analyzer);
                bufferSource.connect(gainNode);
                bufferSource.connect(context.destination);
                bufferSource.start(0, currentTime / 1000);
                started = Date.now();
            }
            isPlaying = !isPlaying;
        }
    } else if (event.which == KEY_O_UPPER || event.which == KEY_O_LOWER) {
        if (started) {
            if (downloadSongData != true) {
                $('#download-value').html("Enabled<br>Press P to Pause");
                downloadSongData = true;
            } else {
                $('#download-value').html("Disabled<br>Press P to Pause");
                downloadSongData = false;
            }
        }
    }
});
