//Audit Manager

var Text = {
    AllChars: '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
    crub: function(l) {
        let a = '';
        for (let i = 0; i < l; i++) {
            a += Text.AllChars.charAt(Math.floor(Math.random() * Text.AllChars.length));
        }
        return a;
    }
}
Math.clamp = function(value, min, max) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}
var Audio = {
    playing: [],
    audio: [],
    id: Text.crub(8),
    status: 0,
    freeId: 0,
    wrapper: null,
    Ready: function() {
        if(Audio.status > 1) {
            return true;
        }
    },
    PlayFile: function(src, times, settings, onend) {
        if (this.wrapper != null) {
            let srcCheck = src.replaceAll('../', '');
            if (srcCheck.split('.')[1] == 'mp3' || srcCheck.split('.')[1] == 'wav' || srcCheck.split('.')[1] == 'ogg') {
                let set = {
                    src:src,
                    loop: times,
                    played: false,
                    type: src.split('.')[1],
                    times: times,
                    playSpeed: Math.clamp(settings != void 0 ? settings.speed != void 0 ? settings.speed : 1 : 1, 0, 16) || 1,
                    volume: Math.clamp(settings != void 0 ? settings.volume != void 0 ? settings.volume : 1 : 1, 0, 1) || 'def',
                    onend: typeof onend == 'function' ? onend : function() {},
                    id: Audio.freeId,
                }
                this.playing.push(set);
                this.freeId++;
                return set;
            } else {
                this.TypeErr(src.split('.')[1]);
            }
        } else {
            this.LoadErr();
        }
    },
    LoadErr: function() {
        console.warn(`Still in loading state.`);
        this.init();
    },
    TypeErr: function(fileType) {
        console.error(`TypeError: File type .${fileType} is not supported.`);
    },
    init: function(wrapper) {
        if (wrapper) {
            this.wrapper = wrapper;
            this.status = 2;
        } else {
            document.body.focus();
            let audTag = document.createElement('div');
            audTag.id = Audio.id;
            audTag.style.display = 'none';
            document.body.appendChild(audTag);
            this.wrapper = audTag;
            this.status = 2;
        }
    },
    StopSound: function(id) {
        for (let i = 0; i < this.playing.length; i++) {
            let t = this.playing[i];
            if (t.id == id) {
                this.playing.splice(i, 1);
                document.getElementById('sound'+id).remove();
                break;
            }
        }
    }
}
setInterval(function() {
    //audio player
    for (let i = 0; i < Audio.playing.length; i++) {
        let aud = Audio.playing[i];
        if (aud.played == false) {
            let t = document.getElementById(Audio.id);
            if (t != null) {
                let tg = document.createElement('audio');
                tg.setAttribute('controls', 'none');
                tg.setAttribute('preload', 'auto');
                tg.style.display = 'none';
                tg.playbackRate = aud.playSpeed;
                let sor = document.createElement('source');
                sor.src = aud.src;
                if (aud.volume != 'def' && aud.volume != null && aud.volume != void 0) {
                    tg.volume = aud.volume;
                }
                sor.setAttribute('pindex', i)
                tg.addEventListener('ended', function() {
                    if (aud.times <= 0) {
                        Audio.playing.splice(this.pindex, 1);
                        aud.onend();
                        this.remove();
                    } else {
                        this.play();
                        aud.times--;
                    }
                });
                tg.id = 'sound'+aud.id;
                tg.appendChild(sor);
                t.appendChild(tg);
                tg.play();
                aud.times--;
                aud.played = true;
            } else {
                Audio.LoadErr();
            }
        }
    }
});