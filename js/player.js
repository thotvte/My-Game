game.player = {
    x: 54,
    y: 0,
    height: 24,
    highestY: 0,
    direction: "left",
    isInAir: false,
    startedJump: false,
    jumpCount: 0,
    moveInterval: null,
    fallTimeout: function(startingY, time, maxHeight) {
        this.fallInterval = setTimeout(() => {
            if (this.isInAir) {
                this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2);
                if (this.y < this.highestY) {
                    this.highestY = this.y;
                }
                if (time > 37) {
                    this.startedJump = false;
                    game.checkCollisions();
                }
                if (time < 150) {
                    time++;
                    this.fallTimeout(startingY, time, maxHeight);
                } else {
                    game.isOver = true;
                }
                if (this.y > 40) {
                    game.isOver = true;
                }
                game.requestRedraw();
            }
        }, 12);
    },
    animationFrameNumber: 0,
    collidesWithGround: true,
    animations: {
        left: [{ tileColumn: 10, tileRow: 2 }],
        right: [{ tileColumn: 10, tileRow: 2 }]
    },
    jump: function(type) {
        if (!this.isInAir) {
            if (this.fallInterval) {
                clearTimeout(this.fallInterval);
                this.fallInterval = null;
            }
            game.sounds.jump.play();
            this.isInAir = true;
            this.startedJump = true;
            var startingY = this.y;
            var time = 1;
            var maxHeight = 121;
            this.jumpCount = 1;
            if (type === "fall") {
                time = 30;
                maxHeight = 0;
            }
            this.fallTimeout(startingY, time, maxHeight);
        } else if (this.jumpCount < 2) {
            if (this.fallInterval) {
                clearTimeout(this.fallInterval);
                this.fallInterval = null;
            }
            game.sounds.jump.play();
            this.isInAir = true;
            this.startedJump = true;
            var startingY = this.y;
            var time = 1;
            var maxHeight = 121;
            this.jumpCount = 2;
            if (type === "fall") {
                time = 30;
                maxHeight = 0;
            }
            this.fallTimeout(startingY, time, maxHeight);
        }
    }
};
