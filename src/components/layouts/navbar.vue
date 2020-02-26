<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav text-white mr-auto">
                <b-nav-item to="/student">Students</b-nav-item>
                <b-nav-item to="/teacher">Teachers</b-nav-item>
                <b-nav-item to="/classroom">Classrooms</b-nav-item>
                </div>
                <div class="navbar-nav text-white ml-auto">
                <b-icon icon="people-fill" font-scale="2" class="mt-1"></b-icon><b-nav-item-dropdown text="Manager (Manager)" right>
                    <b-dropdown-item href="#"><b-icon icon="tools"></b-icon> Change Password</b-dropdown-item>
                    <b-dropdown-item href="#"><b-icon icon="power"></b-icon> Logout</b-dropdown-item>
                </b-nav-item-dropdown>
                </div>
            </div>
        </nav>
    </div>
</template>
<style>
  body {
    background-color: #fbfbfb!important;
  }
  .bg-dark {
    background-color: #343a40;
  }
  .navbar-dark .navbar-nav .nav-link {
    color: #fff !important;
  }
  .navbar-toggler-icon {
    color: #fff !important;
  }
  .navbar-dark .navbar-nav .nav-link {
    font-size: 13pt;
  }
  .breadcrumb {
    background-color: transparent!important;
  }
  .breadcrumb-item.active {
    font-size: 11pt;
  }
  a {
    font-size: 11pt;
  }
  h2 {
    color: #6c757d!important;
  }
  .dropdown-item {
    padding: 0.25rem 1rem!important;
  }
  .btntambah {
    padding: 0.5rem !important;
  }
  .btn .colorwhite {
    color: #fff!important;
  }
</style>