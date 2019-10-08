// для кучи библиотек нужно, чтобы jquery была
// глобально библиотекой (т.е. доступ к объекту jquery был через window)
// для этого можно использовать expose-loader в вебпаке
import 'expose-loader?$!jquery';
// импорт скриптов
import "bootstrap";
// и стилей из bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// иконки из fontawesome
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';