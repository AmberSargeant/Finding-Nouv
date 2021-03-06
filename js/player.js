function Player(game, key){
	//call to Phaser.Sprite // new Sprite(game, x, y, frame)
	Phaser.Sprite.call(this, game,100,game.world.height-68,key);

	// add properties
	this.anchor.set(0.5);
	game.physics.enable(this);
	this.enableBody = true;
	this.body.collideWorldBounds = true;
	this.body.bounce.y = 0.2;
    this.body.gravity.y = 800;
    this.body.acceleration.x = 0;
    this.animations.add('walk',[0, 1, 3, 2, 1, 3],10, true);
    this.animations.add('newWalk',[5, 6 ,8 ,7 ,6 ,8],8, true);
    this.animations.add('wandHit',[11],6, true);
	this.animations.add('idle', ['nouv02'], 30, false);
	this.animations.add('newIdle', ['pinknouv02'], 30, false);
	this.body.setSize(30, 110, 60, 25);
	this.animations.add('jumping',[4],10, false);
	this.animations.add('newJumping',[9],10, false);
	this.movingRight  = true;
	this.shootButton = game.input.keyboard.addKey(Phaser.Keyboard.E);
	this.shootButton.onDown.add(this.oneHeart, this);
	game.time.events.loop(Phaser.Timer.SECOND*.3, this.takeDamage, this);
	//this.takeDamage();
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
	this.body.velocity.x = 0;
	if(moving){
    if(!wandAttack){
		if (game.input.keyboard.isDown(Phaser.Keyboard.W) && this.body.touching.down && hitPlatform || hitObstaclePlayer && game.input.keyboard.isDown(Phaser.Keyboard.W) 
			&& this.body.touching.down ||  attacked && game.input.keyboard.isDown(Phaser.Keyboard.W) && this.body.touching.down || attackedFear && game.input.keyboard.isDown(Phaser.Keyboard.W)
			&& this.body.touching.down){
			//makes player go up
            this.body.velocity.y = -300; 
            jump.play('', 0, 0.25, false);        
    	}
	}else if(wandAttack){
		if(game.input.keyboard.isDown(Phaser.Keyboard.W) && this.body.touching.down && hitPlatform || hitObstaclePlayer && game.input.keyboard.isDown(Phaser.Keyboard.W) 
			&& this.body.touching.down ||  attacked && game.input.keyboard.isDown(Phaser.Keyboard.W) && this.body.touching.down || attackedFear && game.input.keyboard.isDown(Phaser.Keyboard.W)
			&& this.body.touching.down){
			//makes player go up
            this.body.velocity.y = -420; 
            jump.play('', 0, 0.25, false);        
    	}
	}
	if(!wandAttack){
	//if right key is pressed, player runs to the right"
	if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
		this.movingRight = true;
		this.body.velocity.x = 105;
		this.scale.x = 1;
		this.animations.play('walk');
		//else player runs to the left
	}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
		this.movingRight = false;
		this.body.velocity.x = -105;
		this.scale.x = -1;
		this.animations.play('walk');
	}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.E)){
       if(wandAttack){
			this.animations.play('wandHit');
			wandAttackSound.play('', 0, 0.25, false);
		}
    }else{
		this.animations.play('idle');
	}if(!this.body.touching.down){
    	this.animations.play('jumping');
    }
		//if player pressed up player jump
	}

	if(wandAttack){
	//if right key is pressed, player runs to the right"
	if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
		this.movingRight = true;
		this.body.velocity.x = 105;
		this.scale.x = 1;
		this.animations.play('newWalk');
		//else player runs to the left
	}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
		this.movingRight = false;
		this.body.velocity.x = -105;
		this.scale.x = -1;
		this.animations.play('newWalk');
	}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.E)){
       if(wandAttack){
			this.animations.play('wandHit');
			wandAttackSound.play('', 0, 0.25, false);
		}
    } else {
		this.animations.play('newIdle');
	}	

	if (!this.body.touching.down){
    	this.animations.play('newJumping');
    }
		//if player pressed up player jump
	}

	if(wandAttack){
		game.camera.follow(this, null, 0.1, 0.1);
	}
}
}

Player.prototype.oneHeart = function(){
	if(moving){
		if(wandAttack){
			this.animations.play('wandHit');
			heart = new Heart(game,'heart');
    		hearticles.add(heart);
    		wandAttackSound.play('', 0, 0.25, false);
		}
	}
}

//checks if player takes Damage. 
//a timer is presented to lessen how quickly overlap happens
Player.prototype.takeDamage = function(){
			if(!godMode){
			if(attackedFlame || attackedWrath || attackedEnvy || attacked || attackedFear || attackedWidow || attackedSpikes){
				//console.log("taking damage");
				if(counter == 0){
				//console.log("1 health")
					wall.play('', 0, 0.25, false);
					firstCount = game.time.events.add(Phaser.Timer.SECOND*.5, this.firstCounter, this);
					firstCountCheck = true;	
				}else if(firstCountCheck){
					wall.play('', 0, 0.25, false);
					//console.log("2 health");
					secondCount = game.time.events.add(Phaser.Timer.SECOND*.5, this.secondCounter, this);
					secondCountCheck = true;		
				}else if(secondCountCheck){
					//console.log("3 health");
					wall.play('', 0, 0.25, false);
					thirdCount = game.time.events.add(Phaser.Timer.SECOND*.5, this.thirdCounter, this);
					thirdCountCheck = true;		
				}else if(thirdCountCheck){
					//console.log("4 health");
					wall.play('', 0, 0.25, false);
					fourthCount = game.time.events.add(Phaser.Timer.SECOND*.5, this.fourthCounter, this);
					fourthCountCheck = true;		
				}else if(fourthCountCheck){
					//console.log("5 health");
					wall.play('', 0, 0.25, false);
					fifthCount = game.time.events.add(Phaser.Timer.SECOND*.5, this.fifthCounter, this);
					fifthCountCheck = true;			
				}else if(fifthCountCheck){
					//console.log("6 health");
					wall.play('', 0, 0.25, false);
					sixthCount = game.time.events.add(Phaser.Timer.SECOND*.5, this.sixthCounter, this);
					sixthCountCheck = true;				
				}else if(sixthCount){
					//console.log("7 health");
					wall.play('', 0, 0.25, false);
					seventhCount = game.time.events.add(Phaser.Timer.SECOND*.5, this.seventhCounter, this);
				}	
		}
	}
}
//Timers that manage the healthbar
Player.prototype.firstCounter = function(){
	counter++;
	healthBar.animations.play("one");

}


Player.prototype.secondCounter = function(){
	healthBar.animations.play("two");
	firstCountCheck = false;
	
}

Player.prototype.thirdCounter = function(){
	healthBar.animations.play("three");
	secondCountCheck = false;
	
}

Player.prototype.fourthCounter = function(){
	healthBar.animations.play("four");
	thirdCountCheck = false;
}

Player.prototype.fifthCounter = function(){
	healthBar.animations.play("five");
	fourthCountCheck = false;
}

Player.prototype.sixthCounter = function(){
	healthBar.animations.play("six");
	fifthCountCheck = false;
}

Player.prototype.seventhCounter = function(){
	healthBar.animations.play("seven");
	sixthCountCheck = false;
	game.state.start('GameOver');
	ver1.stop();
	ver2.stop();
	ver3.stop();
	ver4.stop();
	
}

