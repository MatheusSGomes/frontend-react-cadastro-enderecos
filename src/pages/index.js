
const Cadastro = () => {
  return (
  <div>
    <h1 class="mt-4">Cadastro de Endereços</h1>

    <hr />
    
    <h2 class="mb-4">Cadastro de Usuário</h2>

    
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      Mensagem sucesso
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>  
    

    <form class="row g-3 mb-5" method="POST" action="{{ route('index.store') }}">

      <div class="pessoa">
        <div class="row g3">
          <div class="col-md-4">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" name="nome" />
          </div>
      
          <div class="col-md-4">
            <label for="sobrenome" class="form-label">Sobrenome</label>
            <input type="text" class="form-control" id="sobrenome" name="sobrenome" />
          </div>
      
          <div class="col-md-4">
            <label for="idade" class="form-label">Idade</label>
            <input type="number" class="form-control" id="idade" name="idade" />
          </div>
      
          <div class="col-md-6">
            <label for="login" class="form-label">Login</label>
            <input type="text" class="form-control" id="login" name="login" />
          </div>
      
      
          <div class="col-md-6">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="senha" name="senha" />
          </div>
        </div>
      </div>

      <div class="col-12">
        <button type="button" class="btn btn-secondary" id="adicionar-endereco">Adicionar endereço</button>
      </div>

      <div class="enderecos" id="enderecos">
        <div class="endereco">
          <h3 class="mt-4 mb-4">Cadastrar Endereço</h3>
          <hr />
        
          <div class="row g-3">
            <div class="col-4">
              <label for="rua" class="form-label">Rua</label>
              <input type="text" class="form-control" id="rua" name="enderecos[1][rua]" />
            </div>
        
            <div class="col-4">
              <label for="numero" class="form-label">Número</label>
              <input type="text" class="form-control" id="numero" name="enderecos[1][numero]" />
            </div>
        
            <div class="col-4">
              <label for="bairro" class="form-label">Bairro</label>
              <select id="bairro" class="form-select" name="enderecos[1][bairro]">
                <option selected disabled>Escolha...</option>
                
                  <option value="{{ $bairro->codigo_bairro }}"> bairro nome </option>

              </select>
            </div>  
        
            <div class="col-4">
              <label for="cep" class="form-label">CEP</label>
              <input type="text" class="form-control" id="cep" name="enderecos[1][cep]" />
            </div>
        
            <div class="col-8">
              <label for="complemento" class="form-label">Complemento</label>
              <input type="text" class="form-control" id="complemento" name="enderecos[1][complemento]" />
            </div>
          </div>

          <button type="button" class="btn btn-danger mt-2 d-none" id="remover-endereco" onclick="removeEndereco(event)">Remover endereço</button>
        </div>
      </div>

      <div class="col-12">
        <button type="submit" class="btn btn-primary">Cadastrar</button>
      </div>
    </form>
  </div>
  );
};

export default Cadastro;
