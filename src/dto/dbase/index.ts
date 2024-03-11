import { IFavorites, IAlbum, ITrack, IArtist } from "../music";
import { IUser } from "../user";

export interface IDatabase {
  users: IUser[];
  artists: IArtist[];
  tracks: ITrack[];
  albums: IAlbum[];
  favorites: IFavorites;
}