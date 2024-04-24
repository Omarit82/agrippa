<?php
function showHome(){
    #Muestra el home de la pagina. Login
    include_once './pages/headerLogin.html';
    ?>
    <main>
        <div class="container-fluid row mt-5 mb-5">
            <form action="post" method="" class="card col-6 m-auto">
                <h1 class="text-center">Login</h1>
                <div class="mb-3 pt-5">
                    <label for="inputLogin" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputLogin" placeholder="nombre@ejemplo.com">
                </div>
                <div class="mb-3 pb-5">
                    <label for="pass" class="form-label">Password</label>
                    <input type="password" class="form-control" id="pass" placeholder="Su Password">
                </div>
            </form>
        </div>
    </main>
    <?php
    include_once './pages/footer.html';
}