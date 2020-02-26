import Vue from 'vue'
import VueRouter from 'vue-router'
import studentPage from '@/components/pages/student'
import teacherPage from '@/components/pages/teacher'
import classroomPage from '@/components/pages/classroom'
import mainPage from '@/components/layouts/main'
const routes = [
    {
        path: '/',
        redirect: '/student',
        component: mainPage,
        children: [
            {
                path: 'student',
                component: studentPage,
                name: 'Halaman Murid'
            },
            {
                path: 'teacher',
                component: teacherPage,
                name: 'Halaman Guru'
            },
            {
                path: 'classroom',
                component: classroomPage,
                name: 'Halaman Kelas'
            },            
        ],
    }
]

Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    linkActiveClass: 'active'
})

export default router