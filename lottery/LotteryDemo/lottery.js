(function (win, $) {
    var defaultPar = {
        rotateNum: 5,
        body: 'body',
        clickCb: function () {},
        renderCb: function () {}
    }
    win.Lottery = Lottery;
    function Lottery(pars) {
        this.pars = $.extend(true, {}, defaultPar, pars);
        this.isDoing = false;
        this.init();
    }
    Lottery.prototype.init = function () {
        var _this = this;
        // this.rotateAll = this.pars.rotateNum * 360;
        $(this.pars.body).on('click', '#button', function () {
            if(!_this.isDoing) {
                _this.isDoing = true;
                _this.pars.clickCb();
            }  
        })
        $(this.pars.body).find('.box').get(0).addEventListener('webkitTransitionEnd', function () {
            var deg = $(_this.pars.body).attr('data-deg');
            _this.pars.renderCb(deg);
            $(_this.pars.body).find('.box').css({
                transform: 'rotate(' + deg + 'deg)',
                transition: 'none'
            })
            _this.isDoing = false;
        })
    }
    Lottery.prototype.goRotate = function (deg) {
        // var rotateEnd = this.rotateAll + deg;
        var rotateEnd = this.pars.rotateNum * 360 + deg;
        $(this.pars.body).find('.box').css({
            transform: 'rotate(' + rotateEnd + 'deg)',
            transition: 'all 5s'
        })
        $(this.pars.body).attr('data-deg',deg);
    }
    
})(window, $)