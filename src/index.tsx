import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import App from './App';
import { AddEditBook } from './components/AddEditBook/AddEditBook';
import { WelcomePage } from './components/WelcomePage/WelcomePage';
import { AddBook } from './components/AddBook/AddBook';
import { VisitorsPage } from './components/VisitorsPage/VisitorsPage';
import { BooksPage } from './components/BooksPage/BooksPage';
import { AddEditUser } from './components/AddEditUser/AddEditUser';
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

