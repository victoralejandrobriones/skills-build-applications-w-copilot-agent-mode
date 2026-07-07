import './App.css'

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier fitness tracking application.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <span className="badge bg-primary">React 19</span>
                <span className="badge bg-success">Express + TypeScript</span>
                <span className="badge bg-info text-dark">MongoDB + Mongoose</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
