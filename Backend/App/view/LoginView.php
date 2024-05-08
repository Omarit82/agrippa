<?php


class LoginView{
    

    function __construct(){
        
    }

    function show($message = ''){ //Por default el mensaje es vacio. Si llega contraseña incorrecta disparamos el modal.
        require_once './Frontend/pages/headerLogin.html';?>
        <main>
            <div class="container vh-75">
                <form action="verifyLogin" method="POST" class="card d-flex flex-column col-5 m-auto">
                    <input type="email" name="email" id="emailLogin" placeholder="  USUARIO" class="m-2">
                    <input type="password" name="password" id="password" placeholder="  PASSWORD" class="m-2">
                    <button type="submit" class="col-3 btn btn-success m-auto mb-2">Login</button>
                </form>
            </div>
            <?php if (!empty($message)){ ?>
                <div class="container">
                    <h5 class="text-center"><?php echo $message?></h5>
                </div>
            <?php        
            }    
            ?>
        </main>
        <?php
        require_once './Frontend/pages/footer.html';
    }

}