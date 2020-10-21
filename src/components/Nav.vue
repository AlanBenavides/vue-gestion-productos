<template>
    <div>
        <nav class="navbar navbar-expand-xl navbar-light bg-light">
	    <a href="#" class="navbar-brand"><i class="fa fa-cube"></i>Online<b>Store</b></a>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collection of nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse justify-content-start">
            <div class="navbar-nav ml-auto">
                <div>
                    <a href="#" class="nav-link dropdown-toggle user-action"><img src="@/assets/logo.png" height="30px" width="30px"> Paula Wilson <b class="caret"></b></a>
                </div>
            </div>
        </div>
</nav>
    </div>
</template>

<script>
export default {
    name: "Nav"
}
</script>>