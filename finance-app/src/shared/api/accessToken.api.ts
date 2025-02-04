class AccessToken {
    key: string = 'accessToken'

    setToken = (token: string) => {
        localStorage.setItem(this.key, token)
    }

    getToken = () => {
        localStorage.getItem(this.key)
    }

    removeToken = () => {
        localStorage.removeItem(this.key)
    }
}

export const accessToken = new AccessToken()
