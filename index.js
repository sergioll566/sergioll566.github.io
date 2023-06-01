class LoginScreen{
    constructor(){
        this.input_login = document.getElementById("input_login");
        this.btn_login = document.getElementById("btn_login");
        this.screen = document.getElementById("login_screen");
        this.key_word = "keyword";
        this.sound_erro = new Audio("audios/fondo/error.mp3");
        this.sound_success = new Audio("audios/fondo/d9.mp3");
        this.sound_erro.load();
        this.candado = document.getElementById("candado");
        this.sound_erro.volume = 0.5;
        this.player_screen = document.getElementById("player_screen");
        this.init_events();

    }

    init_events(){
        this.btn_login.addEventListener("touchend",()=>this.change_to_main())
    }

    validate_login(input){
        return input.value.toLowerCase() == this.key_word.toLowerCase()
    }
    change_to_main(){
            const result = this.validate_login(this.input_login)
            
            if (result){
                
                this.candado.style.animation = "desbloquear_candado 1s linear 0s 1"
                
                // setTimeout(()=>this.screen.style.display = "none",400)
                setTimeout(()=>{
                    this.candado.src = "imagenes/iconos/candado_abierto.png"
                    this.player_screen.style.display = "grid"
                // this.screen.style.transform = "translateX(100%)"
                // this.screen.style.backgroundColor = "transparent"
                // this.sound_success.load()
                this.sound_success.play()
                this.btn_login.style.transform = "scale(0)"
                },1010)
                
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
const morquecho = new LoginScreen()


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
                  this.label_message.style.boxShadow = "0 0 10px #2f2843c0"
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
            this.label_message.style.boxShadow = "none";
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
        this.current_audio = document.getElementById("musica");
        this.current_music_index = 0;
        this.image = document.getElementById("player_img");
        this.title = document.getElementById("player_title");
        this.message = document.getElementById("player_message");
        this.is_playing = false;
        this.limit_time_clicks = 1000; // in milliseconds
        this.ready_to_click = true
        this.is_changing = false
        this.min_total_label  = document.getElementById("min_total_label");
        this.min_actual_label = document.getElementById("min_actual_label");
        this.progress_bar = document.getElementById("player_duration");
        this.songs = [
            {
                path:"audios/Enamorado tuyo.mp3",
                image:"imagenes/Enamorado tuyo.jpg",
                title:'Enamorado tuyo',
                message:`Esta canción la canta un chico el cual quiere ocultar el amor que siente por una persona,
                no quiere que nadie se entere ya que no sabe como expresar sus sentimientos, trata de ocultarlo 
                pero el enamoramiento es un sentimiento demasiado fuerte como para hacerlo, lo que mas me hace recordarte al escucharla
                es que yo estoy enamorado tuyo &#x2764;`
            },
            {
                path:"audios/Ataquemos - Cómplice eterno (cover).mp3",
                image:"imagenes/Ataquemos - Cómplice eterno (cover).jpg",
                title:'Cómplice eterno',
                message:`Como aclaración,no me gusta ser explicito, en cualquier sentido.
                Pero me encanta la idea de ser parte de ti, tu amor platónico (con excepción de que lo nuestro si es posible:>),
                y ser tu complice para todo &#x2764; como dice el de la canción, tu complice eterno &#x2764;
                `
            },
            
            {
                path:"audios/El Cinturón Gris.mp3",
                image:"imagenes/El Cinturón Gris.jpg",
                title:'El Cinturón Gris',
                message:"mensaje numero 1"
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
                path:"audios/Combo final.mp3",
                image:"imagenes/Combo final.jpg",
                title:'Combo final',
                message:"mensaje asi es"
            },
            {
                path:"audios/Balada Conformista.mp3",
                image:"imagenes/Balada Conformista.jpg",
                title:'Balada Conformista',
                message:`loasdjbajidbasjdbajdbasjikdbasljkdbaskj;dbasdjbakdjbasskdjbakdjbaskhjdbaukdbasjdbaskjdbakjsdbakjsdbaksjdbakjdbsauikdhisaudvbasjkhdvbgasjhdgbasjlhdgasldghj
                loasdjbajidbasjdbajdbasjikdbasljkdbaskj;dbasdjbakdjbasskdjbakdjbaskhjdbaukdbasjdbaskjdbakjsdbakjsdbaksjdbakjdbsauikdhisaudvbasjkhdvbgasjhdgbasjlhdgasldghj
                loasdjbajidbasjdbajdbasjikdbasljkdbaskj;dbasdjbakdjbasskdjbakdjbaskhjdbaukdbasjdbaskjdbakjsdbakjsdbaksjdbakjdbsauikdhisaudvbasjkhdvbgasjhdgbasjlhdgasldghj
                loasdjbajidbasjdbajdbasjikdbasljkdbaskj;dbasdjbakdjbasskdjbakdjbaskhjdbaukdbasjdbaskjdbakjsdbakjsdbaksjdbakjdbsauikdhisaudvbasjkhdvbgasjhdgbasjlhdgasldghj
                loasdjbajidbasjdbajdbasjikdbasljkdbaskj;dbasdjbakdjbasskdjbakdjbaskhjdbaukdbasjdbaskjdbakjsdbakjsdbaksjdbakjdbsauikdhisaudvbasjkhdvbgasjhdgbasjlhdgasldghj
                loasdjbajidbasjdbajdbasjikdbasljkdbaskj;dbasdjbakdjbasskdjbakdjbaskhjdbaukdbasjdbaskjdbakjsdbakjsdbaksjdbakjdbsauikdhisaudvbasjkhdvbgasjhdgbasjlhdgasldghj`
            },
            {
                path:"audios/El Rey y el As.mp3",
                image:"imagenes/El Rey y el As.jpg",
                title:'El Rey y el As',
                message:"mensaje asi es"
            }
        ];
        this.play_btn = document.getElementById('btn_play');
        this.next_btn = document.getElementById('btn_next');
        this.prev_btn = document.getElementById('btn_prev');
        this.init_events();
        this.load_music(this.songs[this.current_music_index]);
        this.progress_bar.value = 0;
        
    }

    init_events() {
        // play btn
        this.play_btn.addEventListener("touchstart",()=>{
            if(this.ready_to_click){
                this.play_btn.style.transform = "scale(0.8)"
            }
            this.toogle_play()
            
        });
        this.play_btn.addEventListener("touchend",()=>{
                    
                    this.play_btn.style.transform = "scale(1)"
                });

        //next button
        this.next_btn.addEventListener("touchstart",()=>{
            if(this.ready_to_click){
                this.next_btn.style.transform = "scale(0.8)"
            }
            this.change_music(1)
            
            
        });
        this.next_btn.addEventListener("touchend",()=>{
                            
                            this.next_btn.style.transform = "scale(1)"
                        });
        // button prev
        
        this.prev_btn.addEventListener("touchstart",()=>{
            if (this.ready_to_click){
                this.prev_btn.style.transform = "scale(0.8)"
            }
            this.change_music(-1)
            
        });
        this.prev_btn.addEventListener("touchend",()=>{
                                    
                                    this.prev_btn.style.transform = "scale(1)"
                                });

        // end music
        this.current_audio.addEventListener("ended",()=>{
            if (this.is_changing == false){
                this.change_music(1)
            }
            else{
                this.current_audio.currentTime = this.current_audio.duration - 10
                this.progress_bar.value = this.current_audio.currentTime
            }
            
        })
    
        this.current_audio.addEventListener("timeupdate",()=>this.update_time());
        this.current_audio.addEventListener("loadeddata",()=>{
            const duration = this.current_audio.duration;
            const formatTime = (time)=> String(Math.floor(time)).padStart(2,'0');
            this.min_total_label.textContent = `${formatTime(duration/60)}:${formatTime(duration%60)}`;
            if (this.min_total_label.textContent == "NaN"){
                this.min_total_label.textContent = "0:00";
            }
            this.progress_bar.max = this.current_audio.duration;
            this.ready_to_click = true;
        });
        
        this.progress_bar.addEventListener("input",()=>{
            this.is_changing = true;
            this.current_audio.currentTime = this.progress_bar.value;
            
        })
        this.progress_bar.addEventListener("touchend",()=>this.is_changing = false);
    }

    update_time(){
        // this.progress_bar.max = this.current_audio.duration
        const formatTime = (time)=> String(Math.floor(time)).padStart(2,'0');
        const current_time = this.current_audio.currentTime
        this.min_actual_label.textContent = `${formatTime(current_time/60)}:${formatTime(current_time%60)}`;
        this.progress_bar.value = current_time
    }

    toogle_play(){
        if (this.ready_to_click){
            if (this.is_playing){
                this.pause_music();
            }

            else{
                this.play_music();
            }
            
            this.ready_to_click = false
            setTimeout(()=>this.ready_to_click = true,this.limit_time_clicks)
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
        this.ready_to_click = false;
        this.current_audio.src = song.path;
        this.current_audio.load();
        this.image.src = song.image;
        this.title.textContent = song.title;
        document.title = song.title;
        this.message.innerHTML = song.message;

    }

    change_music(direction){
        if (this.ready_to_click){
            this.current_music_index = (this.current_music_index + direction +this.songs.length)%this.songs.length
            this.load_music(this.songs[this.current_music_index])
            this.play_music()
            this.ready_to_click = false
            setTimeout(()=>this.ready_to_click = true,this.limit_time_clicks)
        }

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
        this.sound_click = new Audio("audios/fondo/click.mp3");
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
            generic_labels[i].addEventListener("touchstart",()=>this.show_help(false))
        }       
        
        //help
        this.btn_help.addEventListener("touchstart",()=>{this.show_help(true)
            this.sound_click.load()
            this.sound_click.play();
            this.btn_help.style.transform = "scale(0.9)"
            this.btn_help.getElementsByTagName("img")[0].style.filter = "drop-shadow(0 0 10px transparent)";
        })
        this.btn_help.addEventListener("touchend",()=>{
            this.btn_help.style.transform = "scale(1)"
            
            this.btn_help.getElementsByTagName("img")[0].style.filter = "drop-shadow(0 0 10px var(--text_color))";
        })
        
          
    }
}

const torres = new PlayerScreen()
/*
    !PENDIENTES!

// agregar un sonido cuando el botón se sacude por la mala keyword
? agregar un sonido cuando se cambia la pantalla
* pensar en otra keyword que no sea 'keyword'
? agregar las notas y mas música
// proteger a la aplicación de errores al intentar modificar la música (como cambiarla sin haber cargado antes correctamente)

    !IDEAS!
// Agregar sonido al teclear en el login

*/