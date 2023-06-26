import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import App from './App';
import { WelcomePage } from './components/WelcomePage/WelcomePage';
import { BooksPage } from './components/BooksPage/BooksPage';
import { AddEditBook } from './components/AddEditBook/AddEditBook';
import { AddBook } from './components/AddBook/AddBook';
import { AddEditUser } from './components/AddEditUser/AddEditUser';
import { VisitorsPage } from './components/VisitorsPage/VisitorsPage';
ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/library/books" element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/addEditbook" element={<AddEditBook />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/library/users" element={<VisitorsPage />} />
        <Route path="/addEditUser" element={<AddEditUser />} />
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);

