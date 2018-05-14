// CKEDITOR.instances.editor.getData()
var insertImage = {
    exec: function (editor) {
        imageManager.init(function (url) {
            editor.insertHtml( '<img style="width: 100%" src="' + url[0] + '" />' );
        });
    }
};

var productLink = {
    exec: function (editor) {

        var selected = editor.getSelection().getSelectedElement();

        if (!selected || selected.$.tagName !== 'IMG') return;

        var img$ = $(selected.$);

        var linkType = img$.attr('data-type');

        if (linkType) {
            $('#link-type').val(linkType).change();

            if (linkType === "1") {
                $("#link-commodity").find('option:selected').text(img$.attr('alt'));
            } else if (linkType === '2') {
                $("#link-article").find('option:selected').text(img$.attr('alt'));
            } else if (linkType === '3') {
                $("#link-group").find('option:selected').text(img$.attr('alt'));
            } else if (linkType === '4') {
                $('#link-brand').find('option:selected').text(img$.attr('alt'));
            }else if (linkType === '6') {
                $('#link-category').find('option:selected').text(img$.attr('alt'));
            }
        } else {
            $('#link-type').val(1).change();
            $('#link-commodity').val(0).change();
            $('#link-article').val(0).change();
            $('#link-group').val(0).change();
            $('#link-brand').val(0).change();
            $('#link-category').val(0).change();
        }

        // 初始化数据
        $('#product-link').modal('show');

        document.getElementById('link-save').onclick = function () {
            var linkType = $('#link-type').val();

            var linkCommodity$ = $('#link-commodity');
            var linkArticle$ = $('#link-article');
            var linkGroup$ = $('#link-group');
            var linkBrand$ = $('#link-brand');
            var linkCategory$ = $('#link-category');
            var id, alt;
            if (linkType === "1") {
                id = linkCommodity$.val();
                alt = linkCommodity$.find('option:selected').text();
            } else if (linkType === "2") {
                id = linkArticle$.val();
                alt = linkArticle$.find('option:selected').text();
            } else if (linkType === '3') {
                id = linkGroup$.val();
                alt = linkGroup$.find('option:selected').text();
            } else if (linkType === '4') {
                id = linkBrand$.val();
                alt = linkBrand$.find('option:selected').text();
            }else if (linkType === '6') {
                id = linkCategory$.val();
                alt = linkCategory$.find('option:selected').text();
            } else if (linkType === '5') {
                id = 1;
                alt = '';
            }

            if (!parseInt(id)) {
                $common.alert('请选择商品/文章/分组/品牌!');
                return false;
            }

            img$.attr('data-type', linkType);
            img$.attr('data-id', id);
            img$.attr('alt', alt);

            $('#product-link').modal('hide');
        };
    }
};


$('#link-type').change(function () {
    $('.link-search.active').removeClass('active');
    if (this.value === '1') {
        $('#link-commodity').parent().parent().addClass('active');
    } else if (this.value === '2') {
        $('#link-article').parent().parent().addClass('active');
    } else if (this.value === '3') {
        $('#link-group').parent().parent().addClass('active');
    } else if (this.value === '4') {
        $('#link-brand').parent().parent().addClass('active');
    }else if (this.value === '6') {
        $('#link-category').parent().parent().addClass('active');
    }
});

ninja.select2('#link-commodity', '/commodity/search', 2);
ninja.select2('#link-article', '/article/search', 2);
ninja.select2('#link-group', '/group/search', 2);
ninja.select2('#link-brand', '/brand/search', 2);
ninja.select2('#link-category', '/category/search', 2);



var pluginName = 'insertImage';
var linkName = 'insertLink';

CKEDITOR.plugins.add(pluginName, {
    init: function (editor) {
        editor.addCommand(pluginName, insertImage);
        editor.ui.addButton(pluginName,{
            label:'上传图片',
            icon: '/backend/images/upload.png',
            command: pluginName
        });

        editor.addCommand(linkName, productLink);
        editor.ui.addButton(linkName,{
            label:'图片超链接',
            icon: '/backend/images/link.png',
            command: linkName
        });
    }
});



CKEDITOR.config.extraPlugins = pluginName;