### .env 파일 생성

```
  VITE_OPEN_API_KEY={key}
  VITE_ADMIN_ID={id}
  VITE_ADMIN_PASSWORD={pw}
```

## Ollama

### Ollama 설치

```sh
  brew install ollama
```

## OLLAMA MODEL

- hugging-face 에서 원하는 모델 선택

- **safetensors => gguf 변환**

  - llama.cpp 설치

  ```sh
    git clone https://github.com/ggerganov/llama.cpp.git
    cd llama.cpp
    pip install -r requirements.txt
  ```

  - convert

  ```sh
    python convert_hf_to_gguf.py {모델 저장 경로} --outfile 변환된 모델경로/모델명.gguf --outtype 양자화형식

    양자화형식 : f32 f16 q8_0
  ```

- ollama 실행

```sh
ollama run hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF
```

## TEMPLATE_Model 만들기

- cli 설치

```sh
  brew install huggingface-cli
```

- 모델 설치

```sh
huggingface-cli download {MODEL} {LOCAL_MODEL_NAME}
 --local-dir {LOCAL_PATH} --local-dir-use-symlinks False
```

– local-dir-use-symlinks False: 심볼릭 링크를 사용하지 않고 실제 파일을 사용하여 저장

- 프롬프트 템플릿 작성

```sh
# 파일이름 Modelfile

FROM {LOCAL_MODEL_NAME}

TEMPLATE """{{- if .System }}
<s>{{ .System }}</s>
{{- end }}
<s>Human:
{{ .Prompt }}</s>
<s>Assistant:
"""

SYSTEM """A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user's questions."""

PARAMETER stop <s>
PARAMETER stop </s>
```

- ollama 실행

```sh
ollama create {LOCAL_MODEL} -f Modelfile

# 모델 확인하기
ollama list

# ollama 실행하기
ollama run {LOCAL_MODEL}
```

- ex

```
  MODEL = heegyu/EEVE-Korean-Instruct-10.8B-v1.0-GGUF
  LOCAL_MODEL_NAME = ggml-model-Q5_K_M.gguf
  LOCAL_MODEL =
  LOCAL_MODEL_DIR
```
