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
            if (srcCheck.split('.')[1] == 'mp3' || srcCheck.split('.')[1] == 'wav' || srcCheck.split('.')[1] == 'ogg' || srcCheck.split('.')[1] == 'mid') {
                let set = {
                    src:src,
                    loop: times,
                    played: false,
                    type: src.split('.')[1],
                    times: times,
                    playSpeed: Math.clamp(settings != void 0 ? settings.speed != void 0 ? settings.speed : 1 : 1, 0, 16) || 1,
                    volume: Math.clamp( settings != void 0 ? settings.volume != void 0 ? settings.volume : 1 : 1, 0, 1) || 'def',
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
        this.LoadStart();
    },
    TypeErr: function(fileType) {
        console.error(`Type ${fileType} is not supported.`);
    },
    init: function(wrapper) {
        if (wrapper) {
            this.wrapper = wrapper;
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