import { UrlBaku, UrlBakuModule, requestOptionsGet,requestOptionsDelete } from "../controller/template.js";

let currentPage = 1;

document.addEventListener('DOMContentLoaded', function() {
    const productionId = getProductionIdFromURL();
    updateHrefWithProductionId(productionId);
    fetchModules(productionId, currentPage);

    function fetchModules(productionId, page) {
        fetch(`${UrlBaku}/${productionId}?page=${page}`, requestOptionsGet)
            .then(response => response.json())
            .then(data => {
                updateTable(data);
                updatePagination(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function updateTable(data) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        data.data.forEach((module, index) => {
            const row = document.createElement('tr');
            row.style.textAlign = 'center';
            row.innerHTML = `
                <th class="text-gray-900" scope="row">${data.from + index}</th>
                <td class="fw-bolder text-gray-500">${module.nama_modul}</td>
               
                <td class="fw-bolder text-gray-500">
                    <button class="btn btn-outline-primary view-detail-proses" data-module-id="${module.id}">View Detail Proses</button>
                </td>                
            `;
            tableBody.appendChild(row);
        });

        bindEventListeners();
    }

    function updatePagination(data) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        if (data.prev_page_url) {
            const prevButton = document.createElement('button');
            prevButton.classList.add('btn', 'btn-secondary');
            prevButton.textContent = 'Previous';
            prevButton.addEventListener('click', () => {
                currentPage--;
                fetchModules(productionId, currentPage);
            });
            pagination.appendChild(prevButton);
        }

        if (data.next_page_url) {
            const nextButton = document.createElement('button');
            nextButton.classList.add('btn', 'btn-secondary');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => {
                currentPage++;
                fetchModules(productionId, currentPage);
            });
            pagination.appendChild(nextButton);
        }
    }

    function bindEventListeners() {
        // Event listener for detail buttons
        document.querySelectorAll('.btn-outline-success').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-module');
                window.location.href = `detail-module.html?id=${id}`;
            });
        });

        document.querySelectorAll('.tambah-detail-proses').forEach(button => {
            button.addEventListener('click', event => {
                const moduleId = event.target.getAttribute('data-module-id');
                window.location.href = `tambah-detail-proses.html?module_id=${moduleId}`;
            });
        });
        document.querySelectorAll('.view-detail-proses').forEach(button => {
            button.addEventListener('click', event => {
                const moduleId = event.target.getAttribute('data-module-id');
                const productionId = getProductionIdFromURL();
                window.location.href = `view-detail-proses-produksi.html?module_id=${moduleId}&productionId=${productionId}`;
            });
        });

        // Event listener for edit buttons
        document.querySelectorAll('.btn-outline-warning').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.getAttribute('data-module');
            });
        });

        // Event listener for delete buttons
      
        document.querySelectorAll('.edit-module').forEach(button => {
            button.addEventListener('click', event => {
                const moduleId = event.target.getAttribute('data-module-id');
                window.location.href = `edit-modul-produksi.html?id=${moduleId}`;

            });
        });

        document.querySelectorAll('.delete-module').forEach(button => {
            button.addEventListener('click', event => {
                const moduleId = event.target.getAttribute('data-module-id');
                deleteModule(moduleId);
            });
        });
    
        
    }
    function getProductionIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
    
    function deleteModule(moduleId) {
        Swal.fire({
            title: 'Anda Yakin?',
            text: "Kamu Tidak Bisa Mengembalikan Ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus Data!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${UrlBakuModule}${moduleId}`, {
                    method: 'DELETE',
                    ...requestOptionsDelete
                })
                .then(response => response.json())
                .then(data => {
                    Swal.fire(
                        'Deleted!',
                        'Module has been deleted.',
                        'success'
                    ).then(() => {
                        fetchModules(getProductionIdFromURL(), currentPage); // Refresh the table
                    });
                })
                .catch(error => {
                    console.error('Error deleting module:', error);
                    Swal.fire(
                        'Error!',
                        'Failed to delete module.',
                        'error'
                    );
                });
            }
        });
    }
    function updateHrefWithProductionId(productionId) {
        const addButton = document.querySelector('a.btn-primary');
        if (addButton) {
            addButton.href = `tambah-modul-produksi.html?productionId=${productionId}`;
        }
    }
    function getProductionIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
});