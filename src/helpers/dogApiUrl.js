/* private */
const BASE_URL = 'https://dog.ceo/api';
const STR_EMPTY = '';

/* public */
export const LIST_ALL_BREEDS_URL = BASE_URL + '/breeds/list/all';

export class ImageUrlParamsBuilder {
  constructor() {
    this.breed = STR_EMPTY;
    this.subBreed = STR_EMPTY;
    this.random = true;
    this.randomImageListSize = 0;
  }

  selectBreed(breed) {
    this.breed = breed;
    return this;
  }

  selectSubBreed(subBreed) {
    this.subBreed = subBreed;
    return this;
  }

  switchRandomMode(random) {
    this.random = random;
    return this;
  }

  setRandomImageListSize(size) {
    this.randomImageListSize = size;
    return this;
  }

  build() {
    return {
      breed: this.breed,
      subBreed: this.subBreed,
      random: this.random,
      randomImageListSize: this.randomImageListSize
    };
  }
};

export const buildImageUrl = (params) => {
  const url = [ BASE_URL ];
  if (params.breed !== STR_EMPTY) {
    url.push(`/breed/${params.breed}`);
    if (params.subBreed !== STR_EMPTY) {
      url.push(`/${params.subBreed}`);
    }
    url.push('/images');
  } else {
    url.push('/breeds/image');
  }

  if (params.random || params.breed === STR_EMPTY) {
    url.push('/random');
    if (params.randomImageListSize > 0) {
      url.push(`/${params.randomImageListSize}`);
    }
  }
  return url.join('');
};
