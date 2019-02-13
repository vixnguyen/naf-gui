import * as React from 'react';
import { CharacterItem } from './character-item';
import { API } from 'app/utils/api';
import { CharacterModel } from 'app/models/character.model';

export namespace CharacterList {
  // Character List property definitions
  export interface Props {
    onLoad: (data: any) => void; // action fetch data
    onUpdate: (character: CharacterModel) => void; // action update character
    onDelete: (id: number) => void; // action delete character
    alerter: any; // alert object
    data: any; // character list
  }

  // Character List state definitions
  export interface State {
    isLoading?: boolean; // to check the data list is updating, it helps handle UI/UX
    canLoadmore: boolean; // to check and control button load more on UI
    selectedItem: number | undefined; // to check a specific item is selected, it help control a confirm dialog
  }
}

export class CharacterList extends React.Component<CharacterList.Props, CharacterList.State> {
  constructor(props: CharacterList.Props, state: CharacterList.State) {
    super(props, state);
    // initial state of this component
    this.state = {
      canLoadmore: true,
      selectedItem: undefined
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  /**
   * fetching data when click to load more button
   */
  loadMore = () => {
    this.setState({
      isLoading: true
    });
    this.fetchData();
  };

  /**
   * Fetch Data
   * Call api to fetch character list
   * Note: We can use redux-thunk to make async action instead of this function
   */
  fetchData = () => {
    // fetch n records from offset
    API.get(`/characters?offset=${this.props.data.length}`)
      .then((res: any) => {
        // call action indexCharacter throught property onLoad to update state of character list
        this.props.onLoad(res.data.characters);
        // check and update state for Loadmore button
        this.setState({
          canLoadmore: res.data.loadMore,
          isLoading: false
        });
      })
      .catch((err: any) => {
        // display error message if can not character list
        this.props.alerter.show({
          type: 'danger',
          msg: 'データ接続が失敗しました。後でもう一度やり直してください。',
          timeout: 10000
        });
        this.setState({
          isLoading: false
        });
      });
  };

  /**
   * update state of component when click on a specific character item
   */
  onSelect = (id: number) => {
    this.setState({
      selectedItem: id
    });
  };

  render() {
    const { onDelete, onUpdate, data, alerter } = this.props;
    const { selectedItem, canLoadmore } = this.state;
    return (
      <section className="list-users">
        <h2 className="home-title">キャラクター</h2>
        <table className="table table-striped table-vm">
          <thead>
            <tr>
              <th className="col-1">#</th>
              <th className="col-3 no-wrap">
                <span>名前</span>
                <span> (年齢)</span>
              </th>
              <th className="col-8 comment">コメント</th>
              <th className="col-1 no-wrap">アクション</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length ? (
              data.map((item: any, i: number) => (
                <CharacterItem
                  key={item.id}
                  order={i + 1}
                  character={item}
                  updateCharacter={onUpdate}
                  deleteCharacter={onDelete}
                  selectCharacter={this.onSelect}
                  isVisible={selectedItem === item.id}
                  alerter={alerter}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center empty-data">
                  キャラクターがまだありませんです。
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="view-more center-text">
          <button
            disabled={!canLoadmore}
            onClick={this.loadMore}
            className={`btn btn-outline btn-primary btn-animated ${
              this.state.isLoading ? 'show' : 'hide'
            }`}
          >
            <span className="animated-icon">
              <i className="fa fa-spinner fa-spin" />
            </span>
            <span className="animated-label">さらに表示</span>
          </button>
        </div>
      </section>
    );
  }
}
