function initGame(options) {
    kaboom({
        root: document.getElementById('screen-container'),
        canvas: document.getElementById('screen'),
        width: 800,
        height: 400,
        scale: 1.5,
        font: 'sinko',
        background: [0, 0, 0]
    });

    loadRoot('./sprites/');
    loadSprite('wood', 'wood.png');
    loadSprite('question', 'question.png');
    loadSprite('player', 'player.png');
    loadSprite('player-2', 'player-2.png');
    loadSprite('mushroom', 'mushroom.png');
    loadSprite('coin', 'coin.png');
    loadSprite('block', 'block.png');
    loadSprite('enemy', 'enemy.png');
    loadSprite('portal', 'portal.png');
    loadSprite('boss', 'boss.png');
    loadSprite('burger', 'burger.png');
    loadSprite('taco', 'taco.png');
    loadSprite('hammer', 'hammer.png');
    loadSprite('hp', 'hp.png', {sliceX: 4});
    loadSprite('backdrop', 'backdrop.png');

    // loadRoot('https://i.imgur.com/');
    // loadSprite('wood', 'RsAKI07.png');
    // loadSprite('question', 'uAbD6iL.png');
    // loadSprite('player', 'EYps4pS.png');
    // loadSprite('player-2', '3mhLWcR.png');
    // loadSprite('mushroom', 'Zyl3I4v.png');
    // loadSprite('coin', 'UXPquaa.png');
    // loadSprite('block', '5G7qHgf.png');
    // loadSprite('enemy', 'DzukTzp.png');
    // loadSprite('portal', 'yYanARQ.png');
    // loadSprite('boss', '5NBWzQ5.png');
    // loadSprite('burger', 'YGOc1VY.png');
    // loadSprite('taco', '33vvPJF.png');
    // loadSprite('hammer', 'ZAyuCdS.png');
    // loadSprite('hp', 'VYlLR15.png', {sliceX: 4});
    // loadSprite('backdrop', 'iQ1EGUD.png');

    createScenes(options);
    go('main-menu');
}

function loadUI() {
    add([
        pos(width()-96, 16),
        rect(),
        text('Volver', {size: 18}),
        color(0, 255, 0),
        area(),
        fixed(),
        z(999),
    ]).onClick(() => {
        go('main-menu');
    });

    const coinsIndicator = add([
        pos(width()-12, 48),
        sprite('coin', {width: 24}),
        text('', {
            size: 18,
            transform: {
                pos: vec2(-28, 4)
            }
        }),
        fixed(),
        z(999),
        origin('topright')
    ]);
    coinsIndicator.onUpdate(() => {
        coinsIndicator.text = user.coins.toString();
    });
}

function createScenes(options) {
    scene('main-menu', () => {
        // Background.
        add([
            pos(0, 0),
            sprite('backdrop', {
                width: width(),
                height: height()
            }),
            color(75, 75, 75),
            fixed(),
            z(-999)
        ]);

        const p = center();

        add([
            text('JUEGAZO', {
                size: 32,
                transform: (idx, ch) => ({
                    color: hsl2rgb((time()*0.2+idx*0.1)%1, 0.7, 0.8),
                    pos: vec2(0, wave(-4, 4, time()*4+idx*0.5)),
                    scale: wave(1, 1.2, time()*3+idx),
                    angle: wave(-9, 9, time()*3+idx)
                })
            }),
            pos(p.x, p.y-58),
            origin('center')
        ]);

        add([
            'button',
            'playButton',
            pos(p),
            rect(),
            text('JUGAR', {size: 18}),
            color(255, 255, 255),
            area(),
            origin('center')
        ]).onClick(() => {
            go('level-selection');
        });

        add([
            'button',
            'accountButton',
            pos(p.x, p.y+32),
            rect(),
            text('MI CUENTA', {size: 18}),
            color(255, 255, 255),
            area(),
            origin('center')
        ]).onClick(() => {
            go('account-menu');
        });
    });

    scene('account-menu', () => {
        const loadElt = document.getElementById('load-account-container');

        loadUI();

        // Background.
        add([
            pos(0, 0),
            sprite('backdrop', {
                width: width(),
                height: height()
            }),
            color(75, 75, 75),
            fixed(),
            z(-999)
        ]);

        const p = center();

        add([
            text('CUENTA', {
                size: 32,
                transform: (idx, ch) => ({
                    color: hsl2rgb((time()*0.2+idx*0.1)%1, 0.7, 0.8),
                    pos: vec2(0, wave(-4, 4, time()*4+idx*0.5)),
                    scale: wave(1, 1.2, time()*3+idx),
                    angle: wave(-9, 9, time()*3+idx)
                })
            }),
            pos(p.x, p.y-58),
            origin('center')
        ]);

        add([
            'button',
            'createAccount',
            pos(p),
            rect(),
            text('Crear cuenta', {size: 18}),
            color(255, 255, 255),
            area(),
            origin('center')
        ]);

        add([
            'button',
            'loadData',
            pos(p.x, p.y+32),
            rect(),
            text('Iniciar sesion', {size: 18}),
            color(255, 255, 255),
            area(),
            origin('center')
        ]).onClick(() => {
            loadElt.classList.remove('hidden');
        });

        add([
            'button',
            'saveData',
            pos(p.x, p.y+64),
            rect(),
            text('Guardar progreso', {size: 18}),
            color(255, 255, 255),
            area(),
            origin('center')
        ]);
    });

    scene('level-selection', () => {
        loadUI();

        // Background.
        add([
            pos(0, 0),
            sprite('backdrop', {
                width: width(),
                height: height()
            }),
            color(75, 75, 75),
            fixed(),
            z(-999)
        ]);

        // Options for level selection grid.
        let sep = 48;
        let wrap = 5;
        let pxi = width()/3;
        let px = pxi-sep;
        let py = height()/3;

        add([
            pos(pxi, py),
            text('Niveles', {size: 28})
        ]);

        for (let i = 0; i < levels.length; ++i) {
            if (!(i%wrap)) {
                px = pxi-sep;
                py += sep;
            }
            px += sep;
            let unlocked = i <= user.actualLevel;
            const button = add([
                'button',
                pos(px, py),
                rect(),
                text(i.toString(), {size: 24}),
                unlocked ? color(0, 255, 0) : color(100, 100, 100),
                area(),
                {selection: i}
            ]);
            if (unlocked) {
                button.onClick(() => {
                    go('game', button.selection);
                });
            }
        }

        let bossUnlocked = user.actualLevel === levels.length;
        const bossButton = add([
            'button',
            pos(pxi, py+sep),
            rect(),
            text('JEFE', {size: 24}),
            bossUnlocked ? color(255, 0, 0) : color(100, 100, 100),
            area()
        ]);
        if (bossUnlocked) {
            bossButton.onClick(() => {
                go('final-intro');
            });
        }
    });

    scene('game', levelToPlay => {
        loadUI();

        function patrol(speed, rSpeed, dir = 1) {
            return {
                id: 'patrol',
                require: ['pos', 'area', 'rotate'],

                add() {
                    this.on('collide', (o, c) => {
                        if (c.isLeft() || c.isRight()) {
                            dir = -dir;
                        }
                    });
                },

                update() {
                    this.angle += (rSpeed*dir)*dt()*60;
                    this.move(speed*dir, 0);
                }
            };
        }

        function big(renderTimer = true) {
            let timer = 0;
            let isBig = false;
            let dScale = 1;
            const label = add([
                text('', {
                    transform: (idx, ch) => ({
                        color: hsl2rgb((time()*0.2+idx*0.1)%1, 0.7, 0.8),
                        pos: vec2(0, wave(-4, 4, time()*4+idx*0.5)),
                        scale: wave(1, 1.2, time()*3+idx),
                        angle: wave(-9, 9, time()*3+idx)
                    })
                }),
                pos(width()/2, 40),
                scale(4),
                fixed(),
                origin('center')
            ]);

            return {
                id: 'big',
                require: ['scale'],

                isBig() {
                    return isBig;
                },

                smallify() {
                    dScale = 1;
                    timer = 0;
                    isBig = false;
                },

                biggify(time) {
                    dScale = 2;
                    timer = time;
                    isBig = true;
                },

                update() {
                    if (isBig) {
                        timer -= dt();
                        if (timer <= 0) {
                            this.smallify();
                        }
                        if (renderTimer) {
                            label.text = Math.floor(timer+1).toString();
                        }
                    } else {
                        label.text = '';
                    }
                    this.scale = this.scale.lerp(vec2(dScale), dt()*6);
                }
            };
        }

        const levelConfig = {
            width: 32,
            height: 32,

            '*': () => [
                'player',
                sprite('player'),
                pos(20, 0),
                rotate(0),
                scale(1),
                area(),
                body(),
                big(),
                {
                    movement(dir, force) {
                        this.angle += (ROTATION_SPEED*dir)*dt()*60;
                        this.move(MOVE_SPEED*dir, 0);
                        if (this.isGrounded() && this.isBig()) {
                            shake(force);
                        }
                    }
                },
                origin('center'),
            ],

            '=': () => [
                'wood',
                sprite('wood'),
                area(),
                solid(),
                origin('center')
            ],

            '?': () => [
                'question',
                sprite('question'),
                area(),
                solid(),
                origin('center'),
                'question'
            ],

            '#': () => [
                'block',
                sprite('block'),
                area(),
                solid(),
                origin('center')
            ],

            '$': () => [
                'coin',
                sprite('coin'),
                levelToPlay === user.actualLevel ? color(255, 255, 255) : color(100, 100, 100),
                scale(0.9),
                area(),
                origin('center')
            ],

            '%': () => [
                'mushroom',
                sprite('mushroom'),
                rotate(0),
                scale(0.9),
                area(),
                body(),
                patrol(100, 0, randi(0, 2) ? 1 : -1),
                origin('center')
            ],

            '!': () => [
                'enemy',
                sprite('enemy'),
                rotate(0),
                scale(1),
                area(),
                body(),
                big(false),
                patrol(80, 4),
                origin('center')
            ],

            '¡': () => [
                'enemy',
                sprite('enemy'),
                scale(1),
                area(),
                body(),
                big(false),
                origin('center')
            ],

            '@': () => [
                'portal',
                sprite('portal'),
                pos(0, -16),
                scale(1.2),
                area(),
                solid(),
                origin('center')
            ]
        };

        const JUMP_FORCE = options.PLAYER_JUMP_FORCE;
        const MOVE_SPEED = options.PLAYER_MOVE_SPEED;
        const ROTATION_SPEED = options.PLAYER_ROTATION_SPEED;
        const FALL_DEATH = options.PLAYER_FALL_DEATH;

        gravity(options.GRAVITY_FORCE);
        const level = addLevel(levels[levelToPlay], levelConfig);

        // Background
        add([
            pos(0, 0),
            sprite('backdrop', {
                width: width(),
                height: height()
            }),
            fixed(),
            z(-999)
        ]);

        let tutorial = !levelToPlay;

        const player = get('player')[0];

        let rCoins = 0; // Cantidad de monedas que lleva recolectadas el jugador en el nivel.
        let tCoins = get('coin').length; // Número de monedas que hay en el nivel.
        const coinsLabel = add([
            sprite('coin', {width: 12}),
            text('', {
                transform: {
                    pos: vec2(16, 2)
                }
            }),
            pos(20, 46),
            scale(2),
            fixed()
        ]);

        add([
            text(tutorial ? 'Tutorial' : `Nivel ${levelToPlay}`),
            pos(20, 15),
            scale(2),
            fixed()
        ]);

        if (tutorial) {
            add([
                text('Utiliza las flechas\nizquierda y derecha para moverte'),
                pos(300, 80),
                scale(2),
                origin('center')
            ]);
            add([
                text('Presiona la flecha arriba\npara saltar'),
                pos(1200, 80),
                scale(2),
                origin('center')
            ]);
            add([
                text('Puedes recolectar monedas\n\nEstas son necesarias para completar el nivel\nSin ellas no puedes pasar por el portal de salida!'),
                pos(2600, 80),
                scale(2),
                origin('center')
            ]);
            add([
                text('Ten cuidado con los Mateos\nsi te atrapan te mataran!\n\nPuedes saltar sobre ellos\npara hacerlos explotar'),
                pos(3400, 80),
                scale(2),
                origin('center')
            ]);
            add([
                text('Los bloques con un signo de pregunta\nte daran una sorpresa\nsi saltas debajo de ellos!'),
                pos(4400, 80),
                scale(2),
                origin('center')
            ]);
            add([
                text('Puedes consumir hongos\npara hacerte mas grande y poder\naplastar a los Mateos'),
                pos(5000, 80),
                scale(2),
                origin('center')
            ]);
            add([
                text('Por ultimo, deberas pasar por el portal\npara avanzar al siguiente nivel'),
                pos(6200, 80),
                scale(2),
                origin('center')
            ]);
        }

        onCollide('enemy', 'mushroom', (e, m) => {
            destroy(m);
            e.biggify(4);
        });

        coinsLabel.onUpdate(() => {
            coinsLabel.text = `${rCoins}/${tCoins}`;
        });

        player.onUpdate(() => {
            camPos(
                Common.clamp(player.pos.x, 380, level.width()-410),
                Common.clamp(player.pos.y, -Infinity, level.height()-levelConfig.height*6.7)
            );
            if (player.pos.y >= FALL_DEATH) {
                go('lose', levelToPlay);
            }
        });

        player.onHeadbutt(obj => {
            shake(2);
            if (obj.is('question')) {
                level.spawn('#', obj.gridPos);
                const m = level.spawn('%', obj.gridPos.sub(0, 1));
                m.jump();
                destroy(obj);
            }
        });

        player.onGround(obj => {
            if (obj.is('enemy')) {
                if (!obj.isBig()) {
                    addKaboom(obj.pos);
                    destroy(obj);
                }
                shake(2);
                if (!player.isBig()) {
                    player.jump(JUMP_FORCE*1.2);
                }
            }
        });

        player.onCollide('coin', c => {
            destroy(c);
            ++rCoins;
        });

        player.onCollide('enemy', (e, c) => {
            if (player.isBig()) {
                addKaboom(e.pos);
                destroy(e);
            } else if (!c.isBottom()) {
                go('lose', levelToPlay);
            }
        });

        player.onCollide('mushroom', m => {
            destroy(m);
            player.biggify(4);
        });

        player.onCollide('portal', (p, c) => {
            if ((c.isLeft() || c.isRight()) && rCoins === tCoins) {
                if (levelToPlay === user.actualLevel) {
                    user.coins += rCoins;
                    ++user.actualLevel;
                }
                go('level-selection');
            }
        });

        onKeyDown('left', () => {
            player.movement(-1, 2);
        });

        onKeyDown('right', () => {
            player.movement(1, 2);
        });

        onKeyPress('up', () => {
            if (player.isGrounded()) {
                player.jump(JUMP_FORCE);
            }
        });
    });

    scene('final-intro', () => {
        let frame = 0;
        const frames = ['Antes de terminar', 'Deberas derrotar a...', 'El Jefe Final'];

        add([
            pos(width()-156, height()-32),
            rect(),
            text('Omitir >>>', {size: 18}),
            color(0, 255, 0),
            area()
        ]).onClick(() => {
            go('final');
        });

        const label = add([
            text(frames[frame].toUpperCase(), {
                transform: (idx, ch) => ({
                    color: hsl2rgb((time()*0.2+idx*0.1)%1, 0.7, 0.8),
                    pos: vec2(0, wave(-4, 4, time()*4+idx*0.5)),
                    scale: wave(1, 1.2, time()*3+idx),
                    angle: wave(-9, 9, time()*3+idx)
                })
            }),
            pos(center()),
            scale(3),
            origin('center')
        ]);

        onKeyPress(() => {
            ++frame;
            if (frame >= frames.length) {
                go('final-boss-intro');
            } else {
                label.text = frames[frame].toUpperCase();
            }
        });
    });

    scene('final-boss-intro', () => {
        const boss = add([
            sprite('boss'),
            pos(width()/2, -250),
            scale(1.2),
            origin('bot')
        ]);

        let timer = 0;
        boss.onUpdate(() => {
            timer += dt();
            boss.move(0, 250);
            if (timer >= 5) {
                go('final');
            }
        });
    });

    scene('final', () => {
        const PLAYER_SPEED = options.PLAYER_MOVE_SPEED;
        const HAMMER_SPEED = options.HAMMER_SPEED;
        const HAMMER_ROTATION_SPEED = options.HAMMER_ROTATION_SPEED;
        const HAMMER_DAMAGE = options.HAMMER_DAMAGE;
        const BOSS_SPEED = options.BOSS_SPEED;
        const BOSS_HEALTH = options.BOSS_HEALTH;
        const FOOD_SPEED = options.FOOD_SPEED;
        const FOOD_DAMAGE = options.FOOD_DAMAGE;
        const FOOD_HEALTH = options.FOOD_HEALTH;

        let insane = false;

        function sh() {
            let f = 0;
            let t = 0;
            let timer = 0;

            return {
                id: 'sh',
                require: ['pos'],

                shake(force, time = 0.2) {
                    f = force;
                    t = time;
                    timer = 0;
                },

                update() {
                    if (timer < t) {
                        timer += dt();
                        this.move(rand(-f, f), rand(-f, f));
                    }
                }
            };
        }

        function health(hp, del = true) {
            let h = hp;
            let ih = hp;
            let d = del;
            let isDead = false;
            let onHurt = null;
            let onDeath = null;
            let c = false;

            return {
                id: 'health',

                initialHP() {
                    return ih;
                },

                hp() {
                    return h;
                },

                hurt(hp) {
                    h -= hp;
                    if (typeof onHurt === 'function') {
                        onHurt();
                    }
                },

                isDead() {
                    return isDead;
                },

                onHurt(callBack) {
                    onHurt = callBack;
                },

                onDeath(callBack) {
                    onDeath = callBack;
                },

                update() {
                    if (h <= 0 && !c) {
                        c = true;
                        isDead = true;
                        if (typeof onDeath === 'function') {
                            onDeath();
                        }
                        if (d) {
                            destroy(this);
                        }
                    }
                }
            };
        }

        function spawnFood() {
            const food = add([
                sprite(choose(['burger', 'taco'])),
                pos(rand(0, width()), -40),
                scale(0.16),
                area(),
                {speed: rand(FOOD_SPEED*0.5, FOOD_SPEED*1.5)},
                health(FOOD_HEALTH),
                sh(),
                origin('center'),
                'food',
                'enemy'
            ]);
            food.onHurt(() => {
                food.shake(200);
            });
            wait(insane ? 0.1 : 0.3, spawnFood);
        }

        function spawnHammer(p) {
            add([
                sprite('hammer'),
                pos(p),
                scale(0.2),
                rotate(0),
                area(),
                move(UP, HAMMER_SPEED),
                cleanup(),
                origin('center'),
                'hammer'
            ]);
        }

        function grow(rate) {
            return {
                update() {
                    const n = rate*dt();
                    this.scale.x += n;
                    this.scale.y += n;
                }
            };
        }

        function addExplode(p, n, rad, size) {
            for (let i = 0; i < n; ++i) {
                wait(rand(n*0.1), () => {
                    for (let i = 0; i < 2; ++i) {
                        add([
                            rect(4, 4),
                            outline(4, WHITE),
                            pos(p.add(rand(vec2(-rad), vec2(rad)))),
                            scale(size, size),
                            lifespan(0.1),
                            grow(rand(48, 72)*size),
                            origin('center')
                        ]);
                    }
                });
            }
        }

        const sky = add([
            rect(width(), height()),
            color(0, 0, 0)
        ]);

        const boss = add([
            sprite('boss'),
            pos(width()/2, -40),
            scale(0.3),
            area(),
            sh(),
            health(BOSS_HEALTH, false),
            {dir: 1},
            origin('center'),
            'boss',
            'enemy'
        ]);

        const healthbar = add([
            rect(width(), 24),
            pos(0, 0),
            color(125, 255, 125),
            fixed(),
            {
                max: BOSS_HEALTH,
                set(hp) {
                    this.width = width()*hp/this.max;
                    this.flash = true;
                }
            }
        ]);

        const player = add([
            sprite('player-2'),
            pos(width()/2, height()-30),
            scale(0.08),
            area(),
            health(3),
            {
                limits: {
                    min: 0,
                    max: width()
                }
            },
            origin('center')
        ]);

        const playerHP = add([
            sprite('hp'),
            pos(0, 0),
            scale(0.08),
            origin('center')
        ]);
        playerHP.frame = 3;

        sky.onUpdate(() => {
            const t = time()*10;
            sky.color = insane ? rgb(wave(125, 255, t), wave(125, 255, t+1), wave(125, 255, t+2)) : rgb(0, 0, 0);
        });

        boss.onUpdate(() => {
            if (!boss.isDead()) {
                if (boss.pos.y <= 70) {
                    boss.move(0, 120);
                } else {
                    boss.move((insane ? BOSS_SPEED*5 : BOSS_SPEED)*boss.dir, 0);
                }

                if (boss.pos.x < 0 || boss.pos.x > width()) {
                    boss.dir = -boss.dir;
                }
            }
        });

        healthbar.onUpdate(() => {
            if (healthbar.flash) {
                healthbar.color = rgb(255, 255, 255);
                healthbar.flash = false;
            } else {
                healthbar.color = rgb(125, 255, 125);
            }
        });

        player.onUpdate(() => {
            if (player.pos.x < player.limits.min) {
                player.pos.x = player.limits.max;
            } else if (player.pos.x > player.limits.max) {
                player.pos.x = player.limits.min;
            }
        });

        playerHP.onUpdate(() => {
            playerHP.pos.x = player.pos.x;
            playerHP.pos.y = player.pos.y-30;
        });

        player.onCollide('food', e => {
            destroy(e);
            player.hurt(FOOD_DAMAGE);
        });

        player.onHurt(() => {
            playerHP.frame = player.hp();
            addExplode(player.pos, 1, 24, 0.6);
            shake(4);
        });

        player.onDeath(() => {
            destroy(playerHP);
            addExplode(center(), 12, 120, 30);
            // loop(0.2, () => {
            //     shake(10);
            // });
            wait(2, () => {
                go('main-menu');
            });
        });

        boss.onHurt(() => {
            insane = boss.hp() <= boss.initialHP()/2;
            if (!insane) {
                shake(4);
            }
            healthbar.set(boss.hp());
        });

        boss.onDeath(() => {
            boss.shake(200, 4);
            loop(0.4, () => {
                addKaboom(vec2(rand(boss.pos.x-60, boss.pos.x+60), rand(boss.pos.y-40, boss.pos.y+40)));
            });

            wait(4, () => {
                go('win');
            });
        });

        onCollide('hammer', 'enemy', (h, e) => {
            destroy(h);
            e.hurt(e.is('boss') ? HAMMER_DAMAGE : (insane ? e.hp() : HAMMER_DAMAGE));
            addExplode(h.pos, 1, 24, 0.6);
        });

        onUpdate(() => {
            if (insane && !boss.isDead()) {
                shake(boss.hp() <= boss.initialHP()/4 ? 4 : 1);
            }
        });

        onUpdate('food', f => {
            if (boss.isDead()) {
                destroy(f);
            } else {
                f.move(0, insane ? f.speed*4 : f.speed);
                if (f.pos.y-f.height > height()) {
                    destroy(f);
                }
            }
        });

        onUpdate('hammer', h => {
            h.angle += HAMMER_ROTATION_SPEED;
        });

        onKeyDown('left', () => {
            player.flipX(true);
            player.move(-PLAYER_SPEED, 0);
        });

        onKeyDown('right', () => {
            player.flipX(false);
            player.move(PLAYER_SPEED, 0);
        });

        onKeyPress('up', () => {
            if (!player.isDead()) {
                spawnHammer(player.pos);
            }
        });

        spawnFood();
    });

    scene('lose', levelToPlay => {
        add([
            text('Perdiste!'),
            pos(center()),
            scale(3),
            origin('center')
        ]);
        onKeyPress(() => {
            go('game', levelToPlay);
        });
    });

    scene('win', () => {
        let frame = 0;
        const frames = ['Felicidades!', 'Derrotaste al jefe', 'Ganaste el juego!'];

        const label = add([
            text(frames[frame].toUpperCase(), {
                transform: (idx, ch) => ({
                    color: hsl2rgb((time()*0.2+idx*0.1)%1, 0.7, 0.8),
                    pos: vec2(0, wave(-4, 4, time()*4+idx*0.5)),
                    scale: wave(1, 1.2, time()*3+idx),
                    angle: wave(-9, 9, time()*3+idx)
                })
            }),
            pos(center()),
            scale(3),
            origin('center')
        ]);

        wait(2, () => {
            onKeyPress(() => {
                ++frame;
                if (frame >= frames.length) {
                    go('main-menu');
                } else {
                    label.text = frames[frame].toUpperCase();
                }
            });
        });
    });
}
