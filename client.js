// 클라이언트 스크립트
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    searchButton.addEventListener("click", performSearch);
    searchInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value;

        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ searchTerm })
        })
        .then(response => response.json())
        .then(data => {
            searchResults.innerHTML = '';

            if (data && data.items) {
                data.items.forEach(item => {
                    const videoTitle = item.snippet.title;
                    const videoId = item.id.videoId;

                    const videoLink = document.createElement('a');
                    videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
                    videoLink.target = '_blank';
                    videoLink.textContent = videoTitle;

                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    resultItem.appendChild(videoLink);

                    searchResults.appendChild(resultItem);
                });
            } else {
                searchResults.textContent = '검색 결과가 없습니다.';
            }
        })
        .catch(error => {
            console.error(error);
            searchResults.textContent = '서버 응답 오류';
        });
    }
});
