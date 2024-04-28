<?php


class LoginView{
    

    function __construct(){
        
    }

    function show(){
        require_once './Frontend/pages/headerLogin.html';?>
        <main>
            <div class="container">
                <form action="verifyLogin" method="POST" class="card d-flex flex-column col-5 m-auto">
                    <input type="email" name="email" id="emailLogin" placeholder="  USUARIO" class="m-2">
                    <input type="password" name="password" id="password" placeholder="  PASSWORD" class="m-2">
                    <button type="submit" class="col-3 btn btn-success m-auto mb-2">Login</button>
                </form>
            </div>
        </main>
        <?php
        require_once './Frontend/pages/footer.html';
    }

}