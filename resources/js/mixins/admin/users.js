import locales from '@/data/available_locales.json'
import timezones from '@/data/timezones.json'
export default {
    data() {
        return {
            formShowErrors: false,
            users: [],
            roles: [],
            user: {
                id: '',
                first_name: '',
                last_name: '',
                email: '',
                language: 'en',
                auto_generated_password: false,
                password: '',
                role: '',
                send_details_to: [],
                sessions: [],
                roles: [],
                last_login_at: '',
                active: true,
            },
            locales: locales,
            timezones: timezones,
        }
    },

    methods: {
        generatePassword() {
            if (this.user.auto_generated_password) {
                this.user.password = Math.random().toString(36).slice(-8)
            } else {
                this.user.password = ''
            }
        },

        getUsers() {
            this.makeHttpRequest('GET', '/api/admin/users').then((response) => {
                this.users = response.data.data
            })
        },

        getUser(id) {
            this.makeHttpRequest('GET', '/api/admin/users/' + id).then((response) => {
                this.user = response.data.data
            })
        },

        createUser() {
            this.makeHttpRequest('POST', '/api/admin/users', this.user).then((response) => {
                this.showToast(response.data.message)
                this.$router.push({ name: 'admin-users' })
            })
        },

        updateUser(id) {
            this.makeHttpRequest('PUT', '/api/admin/users/' + id, this.user).then((response) => {
                this.showToast(response.data.message)
                this.$router.push({ name: 'admin-view-user', params: { id: id } })
            })
        },

        deleteUser(id) {
            this.makeHttpRequest('DELETE', '/api/admin/users/' + id).then((response) => {
                this.showToast(response.data.message)
                this.$router.push({ name: 'admin-users' })
            })
        },

        deleteUserAsk(id) {
            this.$confirm.require({
                message: this.$t('admin.user.delete_confirm_user'),
                header: this.$t('basic.confirmation'),
                icon: 'fa fa-circle-exclamation',
                accept: () => {
                    this.deleteUser(id)
                },
            })
        },

        resetPassword(id, data) {
            this.makeHttpRequest('POST', '/api/admin/user/' + id + '/reset-password', data, '', '', false).then((response) => {
                this.showToast(response.data.message)
            })
        },

        getRoles() {
            this.makeHttpRequest('GET', '/api/admin/roles').then((response) => {
                this.roles = response.data.data
            })
        },
    },
}
