var Window = {
    windows: [],
    free_id: 0,
}

var _win = function(title, x, y, w, h, src, settings, srcType) {
    this.title = title || 'New Window';
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 500;
    this.h = h || 500;

    this.settings = settings || {};

    if (!this.srcType) {
        this.src = src || '/df.html';
    } else {
        this.src = '_CONTENT_PANE';
        this.content = src;
    }

    this.dragging = false;

    this.id = Window.free_id;

    this.element = document.createElement('div');

    this.element.setAttribute('id', 'win_'+this.id);
    this.element.innerHTML = `
        <div class='win-content-container'>

        </div>
    `;
}