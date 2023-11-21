const API_BASE_URL = '/api';


const getAuthHeaders = () => {  
    const token = sessionStorage.getItem("token");
    if (token) {
        return {
            "x-auth-token": token
        };
    }

    return {};
}


export const get = async (endpoint = "") => {
    const resp = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { 
            ...getAuthHeaders()
        }
    });


    return {
        data: await resp.json(), 
        resp
    };
};


export const post = async (endpoint = "", data) => {
    const resp = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 
            ...getAuthHeaders(),
            "Content-Type": "application/json"
        }
    });


    return {
        data: await resp.json(), 
        resp
    };
};

export const put = async (endpoint = "", data) => {
    const resp = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { 
            ...getAuthHeaders(),
            "Content-Type": "application/json"
        }
    });


    return {
        data: await resp.json(), 
        resp
    };
};

export const del = async (endpoint = "", data) => {
    const resp = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: { 
            ...getAuthHeaders(),
        }
    });


    return {
        data: await resp.json(), 
        resp
    };
};