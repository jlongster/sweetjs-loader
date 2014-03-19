macro id {
  rule {
    // after the macro name, match:
    // (1) a open paren 
    // (2) a single token and bind it to `$x`
    // (3) a close paren
    ($x)
  } => {
    // just return the token that is bound to `$x`
    $x
  }
}

export id