
import { LocalStorage } from 'quasar'

const state = {
    settings: {
        show12HourTimeFormat: false,
        showTasksInOneList: false
    }
}

const mutations = {
    setShow12HourTimeFormat(state, val) {
        state.settings.show12HourTimeFormat = val
    },
    setShowTasksInOneList(state, val) {
        state.settings.showTasksInOneList = val
    },
    setSettings(state, settings) {
        Object.assign(state.settings, settings)
    }
}

const actions = {
    setShow12HourTimeFormat({ commit, dispatch }, val) {
        commit('setShow12HourTimeFormat', val)
        dispatch('saveSettings')
    },
    setShowTasksInOneList({ commit, dispatch }, val) {
        commit('setShowTasksInOneList', val)
        dispatch('saveSettings')
    },
    saveSettings({ state }) {
        LocalStorage.set('settings', state.settings)
    },
    getSettings({ commit }) {
        let settings = LocalStorage.getItem('settings')
        if (settings) {
            commit('setSettings', settings)
        }
    }
}

const getters = {
    settings: state => state.settings
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
