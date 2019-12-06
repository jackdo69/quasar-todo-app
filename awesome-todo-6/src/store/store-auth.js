import { firebaseAuth } from 'boot/firebase'
import { LocalStorage, Loading, QSpinnerBall } from 'quasar'
import { showErrorMessage } from 'src/functions/function-show-error-message'


const state = {
    loggedIn: false
}

const mutations = {
    setLoggedIn(state, value) {
        state.loggedIn = value
    }
}

const actions = {
    registerUser({}, payload) {
        Loading.show({
  spinner: QSpinnerBall,
  // other props
})
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log('response ', response);
            
        }).catch(error => {
            showErrorMessage(error.message)
            
        })
    },
    loginUser({}, payload) {
        Loading.show({
  spinner: QSpinnerBall,
  // other props
})
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log('response ', response);
            
        }).catch(error => {
            showErrorMessage(error.message)
        })
    },
    logoutUser() {
        console.log('logout');
        
        firebaseAuth.signOut()
    },
    handleAuthStateChange({ commit, dispatch }) {       
        firebaseAuth.onAuthStateChanged(user => {
            Loading.hide()
            if (user) {
              // User is signed in.
              commit('setLoggedIn', true)
              LocalStorage.set('loggedIn',true)
              this.$router.push('/')
                dispatch('tasks/fbReadData', null, { root: true})
            } else {
                //User is logged out
                commit('tasks/clearTasks',null,{root:true})
                commit('tasks/setTasksDownloaded', false, {root: true})
                commit('setLoggedIn', false)
                LocalStorage.set('loggedIn',false)
                this.$router.replace('/auth')
            }
          });
        
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
