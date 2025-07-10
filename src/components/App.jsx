import AppTasksAsyncReduxStore from "./home-work-7/AppTasksReduxAsync"


function App() {
  return (
    <>
      <h1>React homework redone</h1>
      <div
        style={{
          borderWidth: 3,
          borderColor: 'brown',
          borderStyle: 'solid',
          padding: 15,
        }}
      >
<AppTasksAsyncReduxStore/>
      </div>
    </>
  );
}
export default App;
