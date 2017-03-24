import request from 'axios';
import config from './config';
export default function getEmbedly(url) {
  return request.get('https://api.embedly.com/1/oembed',{
    params: {
      url : url,
      key : config.embedlyKey
    }
  });
}
