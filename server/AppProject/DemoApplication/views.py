from rest_framework.views import APIView
from rest_framework.response import Response
import requests

githubUrl = "https://api.github.com/search/repositories?q="


class GithubApiView(APIView):

    def get(self, request):
        try:
            min_stars = request.GET.get('min_stars', '')
            max_stars = request.GET.get('max_stars', '')
            programing_languages = request.GET.get('programing_languages', '')
            lastUpdateRepository = request.GET.get('lastUpdateRepository', '')
            searchResults = self.handle_search(
                githubUrl, min_stars, max_stars, programing_languages, lastUpdateRepository)

            if(searchResults and 'items' in searchResults):
                returnedData = []
                searchResults = searchResults['items'][0:10]
                for searchItem in searchResults:
                    name = searchItem['full_name']
                    description = searchItem['description']
                    created_at = searchItem['created_at']
                    open_issues = searchItem['open_issues']
                    language = searchItem['language']
                    url = searchItem['url']
                    prSize = requests.get(url+'/pulls')
                    prSize = prSize.json()
                    prSize = len(prSize)
                    output = {"name": name, "description": description, "created_at": created_at,
                              "open_issues": open_issues, "language": language, "prSize": prSize}
                    returnedData.append(output)

                return Response(returnedData)
            else:
                return Response({})
        except Exception as e:
            explanation = e.explanation
            return Response(explanation)

    def handle_search(self, url, min_stars, max_stars, programing_languages, lastUpdateRepository):
        searchQuery = ''
        if(min_stars and not max_stars):
            searchQuery += 'stars:>='+min_stars

        if(min_stars and max_stars):
            searchQuery = 'stars:'+min_stars+'..'+max_stars

        if(lastUpdateRepository):
            searchQuery += '+created:'+lastUpdateRepository

        if(programing_languages):
            programingLanguagesList = programing_languages.replace(
                ' ', '').split(',')

            if(len(programingLanguagesList) > 1):
                for programing_language in programingLanguagesList:
                    searchQuery += '+language:'+programing_language
            else:
                searchQuery += '+language:'+programingLanguagesList[0]

        finalUrl = url+searchQuery+'&sort=stars&order=desc'
        print(finalUrl)
        data = requests.get(finalUrl)
        return data.json()
