
import axios from 'axios';
import { apiURL } from "./constant"
import queryString from 'query-string';

class HttpClient {
    constructor() {
        this.api = null;
        this.headers= {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
    }

  //it is a method which initalize http instance
    getInitializedApi() {
        if (this.api) return this.api; // return initialized api if already initialized.
        return (this.api = axios.create({
            baseURL: this.getBaseUrl(),
            responseType: 'json',

            // withCredentials: true
        }));
    }

     //it is a method which return base url
    getBaseUrl() {
        // Insert logic here to get the baseURL by either:
        // 1. Sniffing the URL to determine the environment we're running in.
        // 2. Looking for an environment variable as part of the build process.
        return apiURL.LOAN_API_BASE_URL
    }

    

 //it is a method which use at the time of get
    get(url,header=null,params=null) {
        return this.getInitializedApi().get(this.generateUrl(url,params), {headers: header === null ? this.headers :header});
    }

    //it is a method which use at the time of Post
    post(url, data, header=null) {
        return this.getInitializedApi().post(url, data, {headers: header === null ? this.headers :header });
    }
    
     generateUrl = (url,urlParramData) => {
        if(url && urlParramData)
         {return url.concat("?").concat(queryString.stringify(urlParramData))}
         else{ return url}
      }
      
     //it is a method which use at the time of Post
    
}

export default HttpClient
