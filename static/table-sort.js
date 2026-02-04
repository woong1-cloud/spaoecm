// 테이블 정렬 기능
document.addEventListener('DOMContentLoaded', function() {
    const tables = document.querySelectorAll('.sortable-table');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('th.sortable');
        const tbody = table.querySelector('tbody');
        
        headers.forEach((header, index) => {
            let ascending = true;
            
            // 정렬 가능 표시
            header.style.cursor = 'pointer';
            header.style.userSelect = 'none';
            
            // 초기 아이콘 추가
            if (!header.querySelector('.sort-icon')) {
                const icon = document.createElement('span');
                icon.className = 'sort-icon ms-1';
                icon.innerHTML = '<i class="bi bi-chevron-expand text-muted" style="font-size: 0.7rem;"></i>';
                header.appendChild(icon);
            }
            
            header.addEventListener('click', () => {
                const rows = Array.from(tbody.querySelectorAll('tr'));
                const columnIndex = Array.from(header.parentElement.children).indexOf(header);
                
                // 모든 헤더의 정렬 아이콘 초기화
                headers.forEach(h => {
                    const icon = h.querySelector('.sort-icon');
                    if (icon && h !== header) {
                        icon.innerHTML = '<i class="bi bi-chevron-expand text-muted" style="font-size: 0.7rem;"></i>';
                    }
                });
                
                // 현재 헤더의 정렬 아이콘 업데이트
                const currentIcon = header.querySelector('.sort-icon');
                if (ascending) {
                    currentIcon.innerHTML = '<i class="bi bi-chevron-up text-primary" style="font-size: 0.7rem;"></i>';
                } else {
                    currentIcon.innerHTML = '<i class="bi bi-chevron-down text-primary" style="font-size: 0.7rem;"></i>';
                }
                
                // 정렬
                rows.sort((a, b) => {
                    const cellA = a.children[columnIndex];
                    const cellB = b.children[columnIndex];
                    
                    if (!cellA || !cellB) return 0;
                    
                    // 숫자인지 확인 (콤마 제거 후)
                    let valueA = cellA.textContent.trim().replace(/,/g, '').replace(/일$/, '');
                    let valueB = cellB.textContent.trim().replace(/,/g, '').replace(/일$/, '');
                    
                    // 숫자로 변환 가능하면 숫자로 비교
                    const numA = parseFloat(valueA);
                    const numB = parseFloat(valueB);
                    
                    if (!isNaN(numA) && !isNaN(numB)) {
                        return ascending ? numA - numB : numB - numA;
                    }
                    
                    // 문자열로 비교
                    valueA = cellA.textContent.trim().toLowerCase();
                    valueB = cellB.textContent.trim().toLowerCase();
                    
                    if (valueA < valueB) return ascending ? -1 : 1;
                    if (valueA > valueB) return ascending ? 1 : -1;
                    return 0;
                });
                
                // 정렬된 행 다시 추가
                rows.forEach(row => tbody.appendChild(row));
                
                // 순위 업데이트 (첫 번째 컬럼이 순위인 경우)
                const firstCell = rows[0].children[0];
                if (firstCell && firstCell.textContent.match(/^\d+$/)) {
                    // 순위 컬럼 존재
                    rows.forEach((row, idx) => {
                        const rankCell = row.children[0];
                        if (rankCell.classList.contains('fw-semibold')) {
                            // 순위는 정렬 후에도 유지 (원래 순위 표시)
                            // 필요시 여기서 재번호 매기기 가능
                        }
                    });
                }
                
                ascending = !ascending;
            });
        });
    });
});
