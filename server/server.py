from http.server import BaseHTTPRequestHandler
import urllib.parse as urlparse
import requests
import json

class Server(BaseHTTPRequestHandler):
    githubUrl = "https://api.github.com/search/repositories?q="
    def do_HEAD(self):
        return

    def do_GET(self):
        self.respond()

    def do_POST(self):
        return

    def handle_http(self, status, content_type):
        self.send_response(status)
        self.send_header('Content-type', content_type)
        self.end_headers()
        min_stars = urlparse.parse_qs(urlparse.urlparse(self.path).query).get('min_stars', None)
        max_stars = urlparse.parse_qs(urlparse.urlparse(self.path).query).get('max_stars', None)
        programing_languages = urlparse.parse_qs(urlparse.urlparse(self.path).query).get('programing_languages', None)        
        searchResults = self.handle_search(self.githubUrl,min_stars,max_stars,programing_languages)
        searchResultsList = json.dumps(searchResults)
        searchResultsList = json.loads(searchResultsList)

        # return bytes(json.dumps(searchResults), encoding="utf-8")  

        if(searchResultsList and 'items' in searchResultsList ):
          returnedData = []
          for searchItem in searchResultsList['items']:
            name        = searchItem['full_name']   
            description = searchItem['description']
            created_at  = searchItem['created_at']
            open_issues = searchItem['open_issues']
            language    = searchItem['language']
            url    = searchItem['url']
            prSize = requests.get(url+'/pulls')
            prSize = prSize.json()
            prSize = len(prSize)
            output = {"name": name, "description": description, "created_at": created_at, "open_issues": open_issues, "language": language,"prSize": prSize}
            returnedData.append(output)
          
          returnedData = json.dumps(returnedData)
          return bytes(returnedData, encoding="utf-8")            
        else:
          return bytes(json.dumps([]), encoding="utf-8")    

    def handle_search(self,url,min_stars,max_stars,programing_languages):
        searchQuery = ''
        if( min_stars ):
            searchQuery += 'stars:>='+min_stars[0]

        if( min_stars and max_stars ):
            searchQuery = 'stars:'+min_stars[0]+'..'+max_stars[0]

        if(programing_languages):
            programingLanguagesList = programing_languages[0].replace(' ','').split(',')
                        
            if(len(programingLanguagesList) > 1):
                for programing_language in programingLanguagesList:
                    searchQuery +='+language:'+programing_language
            else:
                searchQuery +='+language:'+programingLanguagesList[0]

        finalUrl = url+searchQuery+'&sort=stars&order=desc'
        print(finalUrl)

        data = requests.get(finalUrl)
        return data.json()
                
    
    def respond(self):
        content = self.handle_http(200, 'application/json')
        self.wfile.write(content)