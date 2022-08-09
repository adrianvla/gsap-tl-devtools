
class DEVTOOLS {
    constructor(TL) {
        this.tl = TL;
        this.d = TL.duration();
        $('body').append(`
      <div class="tl-devtools">
          <div class="tl-devtools-p-c">
              <div class="tl-devtools-p"></div>
          </div>
          <div class="tl-devtools-controls">
              <div class="tl-devtools-desc">TimeLine</div>
              <div class="tl-devtools-buttons">
              <div class="tl-devtools-seek tl-devtools-button">
                  <
              </div>
              <div class="tl-devtools-play tl-devtools-button">
                  pause
              </div>
              <div class="tl-devtools-select tl-devtools-button">
                <select name="time">
                  <option value="2">2x</option>
                  <option value="1">1x</option>
                  <option value="0.5">0.5x</option>
                  <option value="0.25">0.25x</option>
                  <option value="0.1">0.1x</option>
                </select>
              </div>
              </div>
              <div class="tl-devtools-time">
              </div>
          </div>
      </div>
      `);
        this.currentseek = 0;
        let that = this;
        $('.tl-devtools-select select').val(1);
        this.loop = setInterval(() => {
            $('.tl-devtools-time').text(`${Math.floor(1000*TL.time())/1000} / ${that.d} s`);
            $('.tl-devtools-p').css('width', `${100 * TL.time() / that.d}%`);

            if (TL.paused()) {
                $('.tl-devtools-play').text('play')
            } else {
                $('.tl-devtools-play').text('pause')
            }
        }, 1);
        let dragging = false;
        $('.tl-devtools').on('mousedown', function () {
            dragging = true;
        });
        $('.tl-devtools-select select').on('change', function (e) {
            TL.timeScale(Number($('.tl-devtools-select select').val()));
        })
        $('.tl-devtools-play').on('click', function () {
            if (TL.paused()) {
                TL.resume();
            } else {
                TL.pause();
            }
        });
        $('.tl-devtools-seek').on('click', function () {
            TL.play(0);
        });
        $('.tl-devtools').on('mouseup', function () {
            dragging = false;
        });

        function i(e) {
            if (dragging) {
                let x = e.pageX;
                that.currentseek = x;
                let j = document.querySelector('.tl-devtools-p-c').offsetLeft;
                let w = document.querySelector('.tl-devtools-p-c').clientWidth;
                TL.time(that.d * (x - j) / w);
                TL.pause();
            }
        }
        $('.tl-devtools').on('mousemove', i);
        $('.tl-devtools').on('click', i);
        return this;
    }
    destroy() {
        $('.tl-devtools').remove();
        clearInterval(this.loop);
        return true;
    }
}
