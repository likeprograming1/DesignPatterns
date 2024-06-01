// 전제
// 앱 내의 여러 컴포넌트들이 데이터를 사용 할 수 있게 해야 하는 상황이 있다. props 를 통해서 데이터를
// 전달하는 방식이 있지만 앱 내의 모든 컴포넌트들이 데이터에 접근해야 하는 경우 이 작업을 하기 매우 번거롭다.

// 아래의 예시는 prop drilling이라 불리는 안티패턴
// function App() {
//   const data = { ... }

//   return (
//     <div>
//       <SideBar data={data} />
//       <Content data={data} />
//     </div>
//   )
// }

// const SideBar = ({ data }) => <List data={data} />
// const List = ({ data }) => <ListItem data={data} />
// const ListItem = ({ data }) => <span>{data.listItem}</span>

// const Content = ({ data }) => (
//   <div>
//     <Header data={data} />
//     <Block data={data} />
//   </div>
// )
// const Header = ({ data }) => <div>{data.title}</div>
// const Block = ({ data }) => <Text data={data} />
// const Text = ({ data }) => <h1>{data.text}</h1>

// Provider 패턴은 이런 경우에 매우 유용하다.
// 먼저 모든 컴포넌트를 Provider 로 감싼다. Provider 는 HOC로 Context 객체를 제공한다.
// React가 제공하는 createContext 메서드를 활용하여 Context 객체를 만들어낼 수 있다.

// Provider 컴포넌트는 value 라는 prop으로 하위 컴포넌트들에 내려줄 데이터를 받는다.
// 이 컴포넌트의 모든 자식 컴포넌트들은 해당 provider 를 통해 value prop에 접근할 수 있다.

const DataContext = React.createContext();

function App() {
  const data = {
    listItem: "book",
    title: "provider Jin study",
    text: "Provider는 zustand, recoil, redux의 이해의 도움이 되는 것 같다.",
  };

  return (
    <div>
      <SideBar />
      <Content />
    </div>
  );
}

const SideBar = () => <List />;
const List = () => <ListItem />;
const Content = () => (
  <div>
    <Header />
    <Block />
  </div>
);

function ListItem() {
  const { data } = React.useContext(DataContext);
  return <span>{data.listItem}</span>;
}

function Text() {
  const { data } = React.useContext(DataContext);
  return <h1>{data.text}</h1>;
}

function Header() {
  const { data } = React.useContext(DataContext);
  return <div>{data.title}</div>;
}

// 장점
// 컴포넌트 트리의 각 노드에 데이터를 전달하지 않아도 다수의 컴포넌트에 데이터를 전달할 수 있다.

// 리펙토링 과정에 개발자가 실수할 확률을 줄여준다.
// 이전에는 prop의 이름을 변경하기 위해서 모든 컴포넌트를 찾아다니며 코드를 수정해야 했다.

// prop-drilling을 하지 않아도 된다. 이전에는 앱의 데이터 흐름을 알기 매우 어려웠다.
// 어떤 prop이 어디서 생겨나고 어디서 사용되는지 파악이 어려웠다.
// Provider 패턴을 이용하면 데이터가 필요없는 컴포넌트에 불필요하게 prop을 받을 필요가 없어진다.

// 컴포넌트들이 전역 상태에 접근할 수 있도록 Provider 패턴을 활용하여 전역 상태를 유지하

// 단점
// Provider 패턴을 과하게 사용할 경우 특정 상황에서 성능 이슈가 발생할 수 있다.
// 컨텍스트를 참조하는 모든 컴포넌트는 컨텍스트 변경시마다 모두 리렌더링된다.

// 아래 예제는 단순한 카운터로 Increment 버튼은 Button 컴포넌트 안에 있고.
// Reset 버튼은 Reset 컴포넌트 안에 있다. reset을 누르면 카운트가 0으로 초기화된다.

// Increment 버튼을 누르면 카운트만 증가되는것이 아니라 예상과 달리 Reset 컴포넌트 내의 date도 리렌더링되는것을 볼 수 있다.
