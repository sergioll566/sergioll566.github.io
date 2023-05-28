class LoginScreen{
    constructor(){
        this.input_login = document.getElementById("input_login");
        this.btn_login = document.getElementById("btn_login");
        this.screen = document.getElementById("login_screen");
        this.key_word = "keyword";
        this.sound_erro = new Audio("audios/fondo/error.mp3");
        this.sound_success = new Audio("audios/fondo/d9.mp3");
        // this.sound_erro.load();
        this.sound_erro.volume = 0.5;
        this.player_screen = document.getElementById("player_screen");
        this.init_events();

    }

    init_events(){
        this.btn_login.addEventListener("click",()=>this.change_to_main())
    }
    validate_login(input){
        return input.value.toLowerCase() == this.key_word.toLowerCase()
    }
    change_to_main(){
            const result = this.validate_login(this.input_login)
            if (result){
                this.player_screen.style.display = "grid"
                // this.screen.style.transform = "translateX(100%)"
                // this.screen.style.backgroundColor = "transparent"
                this.sound_success.load()
                this.sound_success.play()
                // setTimeout(()=>this.screen.style.display = "none",400)
                
            }
            else{
                this.sound_erro.load()
                this.sound_erro.play()
                this.btn_login.classList.add('btn-animate')
                setTimeout(()=>{
                                    this.btn_login.classList.remove('btn-animate')
                },200)
            }
    }
}
new LoginScreen()


class Message_music{
    constructor(){
        this.label_message = document.getElementById("player_message");
        this.is_maximized = false;
        this.sound_click = new Audio("audios/fondo/click2.mp3");
        this.sound_click.volume = 0.3;
        this.init_events();

    }
    init_events(){
        this.intervalo;
        this.label_message.addEventListener('touchstart', ()=> {
            this.intervalo = setInterval(()=> {
              if (this.is_maximized == false) {
                //   this.label_message.style.position = "absolute";
                //   this.label_message.style.bottom = "18%";
                  this.label_message.style.width = "90%";
                  this.label_message.style.height = "50%";
                  this.label_message.style.alignItems = "center";
                  this.label_message.style.maxHeight = "50%";
                  this.is_maximized = true;
                  this.sound_click.load()
                  this.sound_click.play()
              }
            }, 500); // Intervalo de tiempo en milisegundos
          });
          
          this.label_message.addEventListener('touchend', ()=> {
            clearInterval(this.intervalo);
            this.is_maximized = false;
            // this.label_message.style.position = "relative";
            this.label_message.style.width = "90vw";
            // this.label_message.style.bottom = "0";
            this.label_message.style.alignItems = "flex-start";
            this.label_message.style.height = "15%";
            this.label_message.style.maxHeight = "15%";
          });    
    }

    cambiar_mensaje(mensaje){
        this.label_message.textContent = mensaje
    }
}

class Player{
    constructor(){
        this.current_audio = new Audio();
        this.current_music_index = 0;
        this.image = document.getElementById("player_img");
        this.title = document.getElementById("player_title");
        this.message = document.getElementById("player_message");
        this.is_playing = false;
        this.progress_bar = document.getElementById("player_duration");
        
        this.songs = [
            {
                path:"audios/El Cinturón Gris.mp3",
                image:"imagenes/El Cinturón Gris.jpg",
                title:'El Cinturón Gris',
                message:"mensaje asi es"
            },
            {
                path:"audios/Enamorado tuyo.mp3",
                image:"imagenes/Enamorado tuyo.jpg",
                title:'Enamorado tuyo',
                message:"mensaje asi es"
            },
            {
                path:"audios/Fiesta en lo del Dr. Hermes.mp3",
                image:"imagenes/Fiesta en lo del Dr. Hermes.jpg",
                title:'Fiesta en lo del Dr. Hermes',
                message:"mensaje asi es"
            },
            {
                path:"audios/Mi lista negra.mp3",
                image:"imagenes/Mi lista negra.jpg",
                title:'Mi lista negra',
                message:"mensaje asi es"
            },
            {
                path:"audios/Waiting For Love [blank].mp3",
                image:"imagenes/Waiting For Love [blank].jpg",
                title:'Waiting For Love [blank]',
                message:"mensaje asi es"
            },
        
            {
                path:"audios/Ataquemos - Cómplice eterno (cover).mp3",
                image:"imagenes/Ataquemos - Cómplice eterno (cover).jpg",
                title:'Ataquemos - Cómplice eterno (cover)',
                message:"mensaje asi es"
            },
        
            {
                path:"audios/Combo final.mp3",
                image:"imagenes/Combo final.jpg",
                title:'Combo final',
                message:"mensaje asi es"
            },
            {
                path:"audios/Balada Conformista.mp3",
                image:"imagenes/Balada Conformista.jpg",
                title:'Balada Conformista',
                message:"mensaje asi es"
            },
            {
                path:"audios/El Rey y el As.mp3",
                image:"imagenes/El Rey y el As.jpg",
                title:'El Rey y el As',
                message:"mensaje asi es"
            }
        ]; 

        this.init_events();
        this.load_music(this.songs[0]);
        this.progress_bar.value = 0;
    }

    init_events() {
        //! touch move
        // document.addEventListener('touchmove', function(event) {
        //     event.preventDefault();
        //   }, { passive: false });

        //   document.getElementById("player_duration").addEventListener('touchmove', function(event) {
            
        //   });

        // play button
        let play_btn = document.getElementById('btn_play');
        play_btn.addEventListener("touchstart",()=>{
            this.toogle_play()
            

        });

        //next button
        let next_btn = document.getElementById('btn_next');
        
        next_btn.addEventListener("touchstart",()=>{this.change_music(1)
            
        });
        // button prev
        let prev_btn = document.getElementById('btn_prev');
        prev_btn.addEventListener("touchstart",()=>{this.change_music(-1)
            
        });

        // end music
        this.current_audio.addEventListener("ended",()=>this.change_music(1))
    
        this.current_audio.addEventListener("timeupdate",()=>this.update_time());
        
        this.progress_bar.addEventListener("input",()=>{
            var progress = this.progress_bar.value / 100
            // var duration = this.current_audio.duration
            // console.log(duration)
            // let current_time = (progress / 100) * duration;
            this.current_audio.currentTime = progress * this.current_audio.duration;
        })
    }

    update_time(){
        // let duration = this.current_audio.duration
    
        let current_time = this.current_audio.currentTime / this.current_audio.duration * 100;
        // let progress = (current_time / duration) * 100;
        
        this.progress_bar.value = current_time
           
        
        
    }

    toogle_play(){
        if (this.is_playing){
            this.pause_music();

        }
        else{
            this.play_music();
        }
    }

    play_music(){
        this.current_audio.play();
        this.is_playing = true;
        document.getElementById("btn_play_img").src = "imagenes/iconos/pause.png";

    }
    pause_music(){
        this.current_audio.pause();
        this.is_playing = false;
        document.getElementById("btn_play_img").src = "imagenes/iconos/play.png";
    }

    load_music(song){
        this.current_audio.src = song.path;
        this.current_audio.load();
        // change screen
        // this.progress_bar.max = this.current_audio.duration
        this.image.src = song.image;
        this.title.textContent = song.title;
        this.message.textContent = song.message;

    }
    change_music(direction){
        this.current_music_index =(this.current_music_index + direction +this.songs.length)%this.songs.length
        this.load_music(this.songs[this.current_music_index])
        this.play_music()
    }
}

class PlayerScreen{
    constructor(){
        this.help_message = document.getElementById("mensaje_ayuda")
        this.btn_help = document.getElementById("btn_ayuda")
        this.is_show_message = false
        this.player_message = new Message_music();
        this.player = new Player();
        // console.log(this.btn_help)
        this.sound_click = new Audio("audios/fondo/click2.mp3");
        this.sound_click.volume = 0.3;
        this.init_events();
    }

    // helper function
    show_help(show){
        if (this.is_show_message){
            this.is_show_message = false
            show = false
        }
        if (show){
            this.help_message.style.transform = "translateX(0)"
            this.sound_click.load()
            this.sound_click.play();            
        }
        else{
            this.help_message.style.transform = "translateX(-100%)"
        }
        
        this.is_show_message = show
    }
    init_events(){
        // generic initialization
        const generic_labels = document.getElementsByClassName("generic_reciver")
        for (let i = 0; i < generic_labels.length; i++){
            generic_labels[i].addEventListener("click",()=>this.show_help(false))
        }       
        
        //help
        this.btn_help.addEventListener("click",()=>this.show_help(true))
        
          
    }
}

new PlayerScreen()
/*
!PENDIENTES

* agregar un sonido cuando el botón se sacude por la mala keyword
* agregar un sonido cuando se cambia la pantalla
* pensar en otra keyword que no se 'keyword'
*/