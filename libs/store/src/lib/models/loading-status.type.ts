export enum LoadingStatusEnum {
    NotLoaded = 'not loaded',
    Loading = 'loading',
    Loaded = 'loaded',
    Error = 'error'
}

export type LoadingStatus = LoadingStatusEnum.NotLoaded
| LoadingStatusEnum.Loaded
| LoadingStatusEnum.Loading
| LoadingStatusEnum.Error;