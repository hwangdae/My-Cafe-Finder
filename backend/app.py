from flask import Flask, jsonify, request
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time

app = Flask(__name__)
CORS(app)

@app.route('/searchCafes', methods=['GET'])
def get_searchCafe_data():
    searchName = request.args.get('searchName')  # 쿼리 매개변수에서 searchName 가져오기
    driver = webdriver.Chrome()
    driver.get("https://map.kakao.com/")
    time.sleep(3)

    search = driver.find_element(By.CSS_SELECTOR,"#search\\.keyword\\.query")
    search.send_keys(searchName)
    image = driver.find_element(By.CSS_SELECTOR, "div.coach_layer")

    image.click()
    searchButton = driver.find_element(By.CSS_SELECTOR,"#search\\.keyword\\.submit")
    searchButton.click()
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "a.link_name")))  # 검색 결과가 로드될 때까지 대기

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    titles = soup.select("a.link_name")
    searchCafes = [title.get_text() for title in titles]

    driver.quit()
    return jsonify(searchCafes)

# def get_cafe_data(lat, lng):
#     # Selenium WebDriver 설정
#     options = webdriver.ChromeOptions()
#     # options.add_argument('--headless')  # 브라우저 창을 띄우지 않음
#     options.add_argument('--no-sandbox')
#     options.add_argument('--disable-dev-shm-usage')
#     service = Service('/path/to/chromedriver')  # Chromedriver 경로 설정

#     driver = webdriver.Chrome(service=service, options=options)

#     # 카카오맵 검색 URL 생성
#     search_url = f"https://map.kakao.com/?urlCategory=search&from=total&nil_suggest=btn&q=카페&lat={lat}&lng={lng}"
#     driver.get('https://m.map.kakao.com/actions/searchView?q=%EC%B9%B4%ED%8E%98&wxEnc=MLLOMM&wyEnc=QMNPSPQIM&lvl=4&click=recommend')

#     # 페이지 로드 대기 (필요에 따라 조정)
#     time.sleep(5)

#     # BeautifulSoup으로 HTML 파싱
#     soup = BeautifulSoup(driver.page_source, 'html.parser')

#     # 원하는 데이터 추출
#     cafes = []
#     for item in soup.select('#placeList'):
#         name = item.get_text()
#         address = item.find_next_sibling('address').get_text() if item.find_next_sibling('address') else '주소 없음'
#         cafes.append({'name': name, 'address': address})

#     driver.quit()
#     return cafes

# @app.route('/api/cafes', methods=['GET'])
# def get_cafes():
#     lat = request.args.get('lat')
#     lng = request.args.get('lng')

#     if not lat or not lng:
#         return jsonify({'error': 'Latitude and Longitude are required'}), 400

#     cafes = get_cafe_data(lat, lng)
#     return jsonify(cafes)

if __name__ == '__main__':
    app.run(debug=True)